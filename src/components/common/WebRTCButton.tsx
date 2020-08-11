import React from 'react'
import classnames from 'classnames'
import { css, keyframes } from 'emotion'

import { Audio } from 'components/common'

const waveAnimation = keyframes`
{
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
`

const spinAnimation = keyframes`
    0% {
        -webkit-transform: rotate(-1turn);
        transform: rotate(-1turn)
    }
    to {
        -webkit-transform: rotate(0);
        transform: rotate(0)
    }
`

const callButtonStyles = css`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: #79c842;
  color: #fff;
  height: 50px;
  width: 50px;
  margin: 1em 0;
  z-index: 2;
  cursor: pointer;

  & > .icon {
    z-index: 2;
    font-size: 1.5em;
    pointer-events: none;
  }

  /* States */
  &.disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  &.ringing {
    background-color: #f65b5f;
    &::after {
      content: '';
      position: absolute;
      height: 48px;
      width: 48px;
      border-radius: 100%;
      border: 4px solid red;
      border-top: 4px solid white;
      animation: ${spinAnimation} 1.5s linear infinite;
    }
  }

  &.ready {
    &::before {
      content: '';
      position: absolute;
      background-color: #80cc39;
      height: 50px;
      width: 50px;
      top: 0;
      left: 0;
      z-index: 1;
      border-radius: 100%;
      animation: ${waveAnimation} 2.5s ease-in-out infinite;
    }
  }

  &.hangup {
    background-color: #f65b5f;
  }

  &.ended {
    pointer-events: none;
    opacity: 0.4;
    background-color: #f65b5f;
  }
`

type WebRTCButtonProps = {
  buttonRef: React.RefObject<any>
  stream: MediaStream | null
  status: {
    isFree: boolean
    isConnecting: boolean
    isRinging: boolean
    isAnswered: boolean
    isHungup: boolean
    isRegistered: boolean
  }
  onClick?: () => void
}

const WebRTCButton = ({ buttonRef, status, stream, onClick }: WebRTCButtonProps): JSX.Element => {
  const { isFree, isConnecting, isRinging, isAnswered, isHungup, isRegistered } = status
  return (
    <>
      <Audio stream={stream} />
      <div
        ref={buttonRef}
        className={classnames(callButtonStyles, {
          ready: isRegistered && isFree,
          disabled: !isRegistered,
          hangup: isConnecting || isRinging || isAnswered,
          ringing: isConnecting || isRinging,
          ended: isHungup,
        })}
        id="webrtc-call"
        onClick={onClick}
      >
        <i className="icon">{isFree ? 'phone_call' : 'phone_hangup'}</i>
      </div>
    </>
  )
}

export default WebRTCButton
