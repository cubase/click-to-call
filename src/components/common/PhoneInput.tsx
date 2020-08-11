import React, { useState } from 'react'
import { css } from 'emotion'

import { Flex, Input } from '.'

const countrySelectStyles = css`
  position: relative;
  background-color: #eee;
  display: flex;
  width: 120px;
  height: 36ox;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
`

const phoneInputStyles = css`
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 16px !important;
  padding-left: 1em;
`

type CountryCode = {
  country: string
  code: string
}

type PhoneInputProps = {
  prefixSelectName?: string
  numberInputName?: string
  countryCodeOptions?: CountryCode[]
}

const PhoneInput = ({
  prefixSelectName,
  numberInputName,
  countryCodeOptions,
}: PhoneInputProps): JSX.Element => {
  const [numberValue, setNumberValue] = useState('')

  const handleNumberChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    // Strip whitespace
    const value = event.currentTarget.value.replace(/\s/g, '')
    if (!value.length || /^\d+$/.test(value)) {
      // Separate to 3-char groups
      const number = value.match(/.{1,3}/g)?.join(' ') || ''
      setNumberValue(number)
    }
  }

  return (
    <Flex
      justifyCenter
      style={{
        marginTop: '1em',
      }}
    >
      <select className={countrySelectStyles} name={prefixSelectName}>
        {countryCodeOptions?.map(({ country, code }) => (
          <option key={code} value={code}>
            {`${country} (${code})`}
          </option>
        ))}
      </select>
      <Input
        className={phoneInputStyles}
        maxLength="19"
        name={numberInputName}
        placeholder="Vaše telefonní číslo"
        value={numberValue}
        wrapperProps={{
          style: {
            flex: 1,
          },
        }}
        onChange={handleNumberChange}
      />
    </Flex>
  )
}

export default PhoneInput
