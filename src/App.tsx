import * as React from 'react'
import { useState } from 'react'
import { css } from 'emotion'

import { CallButton, BubbleContainer } from 'components'
import { GlobalContext, GlobalContextState } from 'context'

import { withTheme, ThemedStyleFunction } from 'lib/withTheme'

import './icomoon/styles'

const appStyles: ThemedStyleFunction = ({ position }) => css`
  position: fixed;
  ${position === 'left' ? 'left: 50px;' : 'right: 50px;'}
  bottom: 50px;
  z-index: 9999;

  /* Global styles for click-to-call container*/
  & * {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
  }

  & ul {
    list-style: none;
  }

  & p {
    margin: 1em 0;
  }
`

type AppProps = {
  context: GlobalContextState
}

const App = ({ context }: AppProps): JSX.Element => {
  const [showBubble, setShowBubble] = useState(false)

  const handleToggleBubble = (): void => setShowBubble((state) => !state)
  const handleCloseBubble = (): void => setShowBubble(false)

  return (
    <GlobalContext.Provider value={context}>
      <div className={withTheme(appStyles, context.theme)} id={`ctc-${context.appId}`}>
        <CallButton onClick={handleToggleBubble} />
        {showBubble && <BubbleContainer onClose={handleCloseBubble} />}
      </div>
    </GlobalContext.Provider>
  )
}

export default App
