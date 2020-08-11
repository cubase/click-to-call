import React from 'react'

import { useObserver, useGlobalContext, useBeforeUnload } from 'hooks/common'
import { useJssip, JsSIPRTCState } from 'hooks/useJssip'
import { ConcernSeparationHook } from 'hooks/models/types'
import { CALL_STATES } from 'lib/callStates'
import { createAudioPlayer } from 'lib/audioPlayer'

import ringtone from '../../../assets/ringtone.wav'

const soundMap = {
  ringing: { filename: ringtone, volume: 1.0 },
}
const audioPlayer = createAudioPlayer(soundMap)

const getStatusText = (callState: string): string => {
  switch (callState) {
    case CALL_STATES.FREE:
      return 'Kliknutím na tlačítko zahájíte hovor.'
    case CALL_STATES.CONNECTING:
    case CALL_STATES.RINGING:
      return 'Vytáčím...'
    case CALL_STATES.ANSWERED:
      return 'Spojeno.'
    case CALL_STATES.CALL_END:
      return 'Zavěšeno.'
    default:
      return ''
  }
}

type CallWebRTCOperations = {
  handleButtonClick: () => void
}

type CallWebRTCModels = {
  webrtcButtonRef: React.MutableRefObject<HTMLElement | null>
  rtc: JsSIPRTCState
  status: {
    isFree: boolean
    isConnecting: boolean
    isRinging: boolean
    isAnswered: boolean
    isHungup: boolean
    isRegistered: boolean
  }
  statusText: string
}

const useCallWebRTC: ConcernSeparationHook<CallWebRTCOperations, CallWebRTCModels, void> = () => {
  const { webrtc } = useGlobalContext()

  if (!webrtc) {
    throw Error('[CTC] Cannot use useCallWebRTC without SIP credentials')
  }

  const [{ isRegistered, status }, call, hangup, rtc] = useJssip({
    uri: `sip:${webrtc.name}@${webrtc.hostname}`,
    user: webrtc.name,
    password: webrtc.secret,
    socket: `wss://${webrtc.hostname}:8089/ws`,
  })

  const isFree = status === CALL_STATES.FREE
  const isConnecting = status === CALL_STATES.CONNECTING
  const isRinging = status === CALL_STATES.RINGING
  const isAnswered = status === CALL_STATES.ANSWERED
  const isHungup = status === CALL_STATES.CALL_END

  useObserver(status, () => {
    audioPlayer.stopAll()
    if (isRinging) {
      audioPlayer.play('ringing', true)
    }
  })

  const webrtcButtonRef = useBeforeUnload(!!rtc.session, hangup)

  const handleButtonClick = (): void =>
    rtc.session ? hangup() : call(`sip:${webrtc.number}@${webrtc.hostname}`)

  const operations = {
    handleButtonClick,
  }
  const models = {
    webrtcButtonRef,
    rtc,
    status: {
      isFree,
      isConnecting,
      isRinging,
      isAnswered,
      isHungup,
      isRegistered,
    },
    statusText: !isRegistered ? 'Odpojeno.' : getStatusText(status),
  }

  return { operations, models }
}

export { useCallWebRTC }
