import React from 'react'
import { css } from 'emotion'
import classnames from 'classnames'

import { withTheme, ThemedStyleFunction } from 'lib/withTheme'
import { useGlobalContext } from 'hooks/common'

const navigationStyles: ThemedStyleFunction = ({ color }) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  color: rgb(187, 187, 187);

  & > li {
    text-align: center;
    margin: 0 1.5em;
    padding: 15px 10px;
    white-space: nowrap;
    border-bottom: 3px solid transparent;
    font-weight: bold;
    cursor: pointer;
  }

  & > li.active {
    color: ${color};
    border-bottom: 3px solid ${color};
  }
`

type NavigationValue = {
  label: string
  value: string
}

type NavigationProps = {
  value: NavigationValue
  options: NavigationValue[]
  onChange?: (value: NavigationValue) => void
}

const Navigation = ({
  value: navigationValue,
  onChange = (): void => {},
  options,
}: NavigationProps): JSX.Element => {
  const { theme } = useGlobalContext()
  return (
    <ul className={withTheme(navigationStyles, theme)}>
      {options.map((option) => (
        <li
          key={option.value}
          className={classnames({
            active: navigationValue.value === option.value,
          })}
          onClick={(): void => onChange(option)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  )
}

export default Navigation
