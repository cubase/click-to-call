import React, { HTMLAttributes, ButtonHTMLAttributes } from 'react'
import { css } from 'emotion'

import { withTheme, ThemedStyleFunction } from 'lib/withTheme'
import { Flex } from '.'
import { useGlobalContext } from 'hooks/common'

const buttonStyles: ThemedStyleFunction = ({ color }) => css`
  padding: 1em 2em;
  background-color: ${color};
  color: #fff;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  cursor: pointer;

  & div {
    font-size: 14px !important;
  }
`

type ButtonProps = {
  icon?: string
  children: any
  [key: string]: any
}

const Button = ({ icon, children, ...props }: ButtonProps): JSX.Element => {
  const { theme } = useGlobalContext()
  return (
    <button className={withTheme(buttonStyles, theme)} {...props}>
      <Flex justifySpaceBetween>
        {icon && <i className="icon">{icon}</i>}
        {children}
      </Flex>
    </button>
  )
}

export default Button
