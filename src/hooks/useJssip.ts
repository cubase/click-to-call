import 'webrtc-adapter'
import JsSIP from 'jssip'
import { UAConfiguration } from 'jssip/lib/UA'
import { RTCSession } from 'jssip/lib/RTCSession'

import { useState, useEffect } from 'react'
import { CALL_STATES } from '../lib/callStates'

export type JsSIPState = {
  isRegistered: boolean
  status: keyof typeof CALL_STATES
}

export type JsSIPConfig = {
  uri: string
  user: string
  password: string
  socket: string
  displayName?: string
}

export type JsSIPRTCState = {
  session: RTCSession | null
  stream: MediaStream | null
}

export type JsSIPControl = [JsSIPState, (uri: string) => void, () => void, JsSIPRTCState]

const generateSipConfig = ({
  uri,
  user,
  password,
  socket,
  displayName = 'Click-to-call',
}: JsSIPConfig): UAConfiguration => ({
  uri,
  password,
  sockets: new JsSIP.WebSocketInterface(socket),
  display_name: displayName,
  authorization_user: user,
  connection_recovery_min_interval: 2,
  connection_recovery_max_interval: 15,
  register_expires: 60,
})

const HANG_UP_DELAY = 3000

export const useJssip = (configuration: JsSIPConfig): JsSIPControl => {
  const [jssipUA, setJsSIP] = useState<JsSIP.UA | null>(null)
  const [rtc, setRTC] = useState<JsSIPRTCState>({
    session: null,
    stream: null,
  })
  const [state, setState] = useState<JsSIPState>({
    isRegistered: false,
    status: CALL_STATES.FREE,
  })

  const endSession = (type: string, cause?: string): void => {
    setRTC({
      session: null,
      stream: null,
    })
    setState((state) => ({
      ...state,
      status: CALL_STATES.CALL_END,
    }))
    setTimeout(
      () =>
        setState((state) => ({
          ...state,
          status: CALL_STATES.FREE,
        })),
      HANG_UP_DELAY
    )
    console.log('[CTC] Session ended:', cause || 'hangup')
  }

  const handleRemoteStream = (stream: MediaStream | null): void =>
    setRTC((state) => ({
      ...state,
      stream,
    }))

  const call = (uri: string): void => {
    if (jssipUA === null || !navigator.mediaDevices) return

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        const session = jssipUA.call(uri, {
          pcConfig: {
            iceServers: [],
          },
          mediaConstraints: {
            audio: true,
            video: false,
          },
          rtcOfferConstraints: {
            offerToReceiveAudio: true,
            offerToReceiveVideo: false,
          },
        })

        session.on('connecting', () => {
          setState((state) => ({
            ...state,
            status: CALL_STATES.CONNECTING,
          }))
          setRTC((state) => ({
            ...state,
            session,
          }))
        })
        session.on('progress', () =>
          setState((state) => ({
            ...state,
            status: CALL_STATES.RINGING,
          }))
        )
        session.on('accepted', () =>
          setState((state) => ({
            ...state,
            status: CALL_STATES.ANSWERED,
          }))
        )
        session.on('failed', ({ cause }: { cause: string }) => endSession('failed', cause))
        session.on('ended', () => endSession('ended'))

        // Handle RTCPeerConnection (audio stream)
        session.connection.addEventListener('addstream', (event: MediaStreamEvent) =>
          handleRemoteStream(event.stream)
        )
      })
      .catch((error) => console.error('[CTC]', error))
  }

  const hangup = (): boolean | void => {
    rtc.session !== null && rtc.session.terminate()
  }

  useEffect(() => {
    const jssipUA = new JsSIP.UA(generateSipConfig(configuration))

    jssipUA.on('connected', () => {
      setJsSIP(jssipUA)
      setState((state) => ({ ...state, isRegistered: true }))
    })
    jssipUA.on('disconnected', () => {
      setJsSIP(null)
      setState((state) => ({ ...state, isRegistered: false }))
    })

    jssipUA.start()
  }, [])

  return [state, call, hangup, rtc]
}
