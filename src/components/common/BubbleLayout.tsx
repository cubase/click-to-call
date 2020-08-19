import React from 'react'
import { css } from 'emotion'

import { Flex } from '.'
import { withTheme, ThemedStyleFunction } from 'lib/withTheme'
import { useGlobalContext } from 'hooks/common'

const bubbleLayoutStyles: ThemedStyleFunction = ({ position }) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  z-index: 999;
  ${position === 'left' ? 'left: calc(50% - 50px);' : 'right: calc(50% - 50px);'}
  bottom: calc(100% + 30px);
  margin: 0;
  min-width: 500px;
  padding: 20px 80px;
  color: #444;
  background-color: #fcfcfc;
  box-shadow: 0 0.125em 0.5em rgba(0, 0, 0, 0.3), 0 0.0625em 0.125em rgba(0, 0, 0, 0.2);
  box-sizing: content-box;
  border-radius: 12px;
  cursor: default;

  & > .icon-close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    padding: 0.5rem;
    cursor: pointer;
  }

  &::before {
    content: '';
    position: absolute;
    height: 0;
    width: 0;
    border: 20px solid transparent;
    border-top-color: #fcfcfc;
    border-bottom: 0;
    ${position === 'left' ? 'left: 30px;' : 'right: 30px;'}
    bottom: 0px;
    transform: translateY(90%);
    filter: drop-shadow(0 0.25em 0.0625em rgba(0, 0, 0, 0.2));
  }
`

const bubbleFooterStyles = css`
  text-align: center;
  font-size: 10px;
  line-height: 1.75em;
  color: #bbb;

  & > .site-link {
    color: #888;
    text-decoration: underline;
  }
`

type BubbleLayoutProps = {
  navigation: JSX.Element
  form: JSX.Element | null
  onClose?: () => void
}

const BubbleLayout = ({
  navigation,
  form,
  onClose = (): void => {},
}: BubbleLayoutProps): JSX.Element => {
  const { theme } = useGlobalContext()
  return (
    <div className={withTheme(bubbleLayoutStyles, theme)}>
      {navigation}
      {form}
      <Flex as="p" className={bubbleFooterStyles} column>
        <span>Společnost využívá zadaná data v souladu s pravidly osobních údajů a GDPR.</span>
        <a className="site-link" href="https://ipex.cz" target="blank">
          IPEX a.s.
        </a>
      </Flex>
      <span className="icon-close" id="close" title="Zavřít" onClick={onClose}>
        &#10005;
      </span>
    </div>
  )
}

export default BubbleLayout
