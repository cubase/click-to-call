import React from 'react'
import { css } from 'emotion'

import { Flex } from 'components/common'

const splashStyles = css`
  font-size: 1.75em !important;
  margin: 4em 0 !important;
`

type SplashProps = {
  text: string
  [key: string]: any
}

const Splash = ({ text, ...props }: SplashProps) => (
  <Flex as="p" className={splashStyles} justifyCenter {...props}>
    {text}
  </Flex>
)

export default Splash
