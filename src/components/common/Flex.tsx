// @flow
import React from 'react'
import classnames from 'classnames'
import { css } from 'emotion'

const flexStyles = css`
  display: flex;

  &.column {
    flex-direction: column;
  }

  &.alignCenter {
    align-items: center;
  }
  &.justifyStart {
    justify-content: flex-start;
  }
  &.justifyCenter {
    justify-content: center;
  }
  &.justifyEnd {
    justify-content: flex-end;
  }
  &.justifySpaceBetween {
    justify-content: space-between;
  }
  &.wrap {
    flex-wrap: wrap;
  }

  /* Spacing */
  &.spacing-1 {
    & > *:not(:last-child) {
      margin-right: 0.625em;
    }
  }
  &.spacing-2 {
    & > *:not(:last-child) {
      margin-right: 0.75em;
    }
  }

  &.spacing-3 {
    & > *:not(:last-child) {
      margin-right: 1em;
    }
  }

  &.spacing-4 {
    & > *:not(:last-child) {
      margin-right: 1.125em;
    }
  }

  /* Margin */
  ${['mrg-1', 'mrg-2', 'mrg-3', 'mrg-4'].reduce((acc, cur, idx) => {
    acc += `&.${cur} {
      margin: ${0.5 + 0.125 * idx}em;
    }\n`

    return acc
  }, '')}
`

const isValidHTMLTag = (tagName: string): boolean =>
  !window.document.createElement(tagName.toUpperCase()).toString().includes('HTMLUnknownElement')

type FlexProps = {
  as?: string
  spacing?: 1 | 2 | 3 | 4
  margin?: 1 | 2 | 3 | 4
  column?: boolean
  justifyStart?: boolean
  justifyCenter?: boolean
  justifyEnd?: boolean
  justifySpaceBetween?: boolean
  alignCenter?: boolean
  wrap?: boolean
  className?: string
  [key: string]: any
}

const Flex = ({
  as = 'div',
  spacing,
  margin,
  column,
  justifyStart,
  justifyCenter,
  justifyEnd,
  justifySpaceBetween,
  alignCenter,
  wrap,
  className,
  ...props
}: FlexProps): JSX.Element => {
  const componentType = isValidHTMLTag(as) ? as : 'div'
  return React.createElement(componentType, {
    className: classnames(
      flexStyles,
      {
        [`spacing-${spacing || ''}`]: spacing && [1, 2, 3, 4].includes(spacing),
        [`mrg-${margin || ''}`]: margin && [1, 2, 3, 4].includes(margin),
        column,
        justifyStart,
        justifyCenter,
        justifyEnd,
        justifySpaceBetween,
        alignCenter,
        wrap,
      },
      className
    ),
    ...props,
  })
}

export default Flex
