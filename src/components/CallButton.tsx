import React from 'react'
import { css, keyframes } from 'emotion'

import { withTheme, ThemedStyleFunction } from 'lib/withTheme'
import { useGlobalContext } from 'hooks/common'

const bounceAnimation = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
`

const shakeAnimation = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
`

const callButtonStyles: ThemedStyleFunction = ({ color }) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65px;
  width: 65px;
  border-radius: 50%;
  background-color: ${color};
  box-shadow: 0 1px 10px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  animation: ${bounceAnimation} 1s ease-in,
    ${shakeAnimation} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) 1.5s alternate;
  z-index: 999;
  user-select: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0px 6px 3px rgba(0, 0, 0, 0.2);
  }
  & > .icon {
    z-index: 2;
    font-size: 24px;
    color: #fff;
    pointer-events: none;
  }
`

const CallButton = ({ ...props }): JSX.Element => {
  const { theme } = useGlobalContext()
  return (
    <div className={withTheme(callButtonStyles, theme)} {...props}>
      <i className="icon">phone_call</i>
    </div>
  )
}

export default CallButton
