import React from 'react'

import { Button, Input, FormLayout, Flex, PhoneInput, Splash } from 'components/common'
import { useCallLater } from 'hooks/models'

const CallLater = (): JSX.Element => {
  const { operations, models } = useCallLater({
    prefixSelect: 'phone-prefix',
    numberInput: 'phone-number',
    timeInput: 'time',
  })
  const { fetch, dayOptions, timeOptions, countryCodeOptions } = models

  if (fetch.loading) {
    return <Splash text="Zpracovávám..." />
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
        <form onSubmit={operations.handleSubmitCallLater}>
          <Flex
            column
            style={{
              marginTop: '2em',
            }}
          >
            <Flex justifyCenter spacing={2}>
              <Input
                icon="calendar"
                options={dayOptions}
                placeholder="Vyberte den"
                type="select"
                value={models.selectedDay}
                wrapperProps={{
                  style: {
                    width: '60%',
                  },
                }}
                onChange={operations.handleChangeDay}
              />
              <Input
                icon="time"
                name="time"
                options={timeOptions}
                placeholder="Vyberte čas"
                type="select"
                wrapperProps={{
                  style: {
                    flex: 1,
                  },
                }}
              />
            </Flex>
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
            <Button type="submit">Zavolat později</Button>
          </Flex>
        </form>
      }
      heading="Vyberte si čas a my Vám rádi zavoláme:"
    />
  )
}

export default CallLater
