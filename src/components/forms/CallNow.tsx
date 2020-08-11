import React from 'react'

import { Flex, PhoneInput, Button, FormLayout, Splash } from 'components/common'
import { useCallNow } from 'hooks/models'

const CallNow = (): JSX.Element => {
  const { operations, models } = useCallNow({
    prefixSelect: 'phone-prefix',
    numberInput: 'phone-number',
  })
  const { fetch, countryCodeOptions } = models

  if (fetch.loading) {
    return <Splash text="Hledám volného operátora..." />
  }

  if (fetch.success) {
    return <Splash text="Děkujeme Vám za využití našich služeb." />
  }

  if (fetch.error) {
    return <Splash text="Došlo k potížím. Zopakujte Váš požadavek později." />
  }

  return (
    <FormLayout
      form={
        <form onSubmit={operations.handleSubmitCallNow}>
          <Flex
            column
            style={{
              marginTop: '2em',
            }}
          >
            <PhoneInput
              countryCodeOptions={countryCodeOptions}
              numberInputName="phone-number"
              prefixSelectName="phone-prefix"
            />
          </Flex>
          <Flex
            justifyCenter
            style={{
              marginTop: '2em',
            }}
          >
            <Button type="submit">Zavolat nyní</Button>
          </Flex>
        </form>
      }
      heading="Zadejte telefon a my Vám obratem zavoláme zdarma!"
    />
  )
}

export default CallNow
