import React from 'react'
import { css } from 'emotion'
import classnames from 'classnames'

const inputStyles = {
  wrapper: css`
    position: relative;
    height: 36px;
  `,

  input: css`
    position: relative;
    height: 100%;
    width: 100%;
    border: 1px solid #bbb;
    border-radius: 4px;
    background-color: #fff;
    padding: 5px 10px;

    &:focus {
      outline-color: #444;
    }

    &:active {
      outline: 0;
    }

    &::placeholder {
      color: #bbb;
    }
  `,

  inputIcon: css`
    position: absolute;
    left: 1em;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);

    & + select,
    input {
      padding-left: 2.5em;
    }
  `,
}

type InputProps = {
  type?: string
  icon?: string
  className?: string
  options?: Array<{
    label: string
    value: string | number
  }>
  wrapperProps?: {
    [key: string]: any
  }
  [key: string]: any
}

const Input = ({
  type = 'text',
  className,
  options,
  icon,
  wrapperProps,
  ...props
}: InputProps): JSX.Element => {
  const commonProps = { className: classnames(inputStyles.input, className), ...props }
  return (
    <div className={inputStyles.wrapper} {...wrapperProps}>
      {icon && <i className={classnames('icon', inputStyles.inputIcon)}>{icon}</i>}
      {type === 'select' ? (
        <select {...commonProps}>
          {options &&
            options.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
        </select>
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  )
}

export default Input
