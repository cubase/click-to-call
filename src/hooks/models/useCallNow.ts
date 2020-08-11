import React, { useState } from 'react'
import { useGlobalContext } from 'hooks/common'

import { jsonFetch } from 'lib/jsonFetch'
import { ConcernSeparationHook } from 'hooks/models/types'

type CallNowOperations = {
  handleSubmitCallNow: (event: React.SyntheticEvent<HTMLFormElement>) => void
}

type CallNowModels = {
  fetch: { loading: boolean; success: boolean; error: string }
  countryCodeOptions: Array<{
    country: string
    code: string
  }>
}

type CallNowInput = {
  prefixSelect: string
  numberInput: string
}

const useCallNow: ConcernSeparationHook<CallNowOperations, CallNowModels, CallNowInput> = ({
  prefixSelect,
  numberInput,
}) => {
  const { appId, token, countries } = useGlobalContext()
  const [fetch, setFetch] = useState({
    loading: false,
    success: false,
    error: '',
  })

  const handleSubmitCallNow = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    const formData = new FormData(event.currentTarget)
    const prefix = String(formData.get(prefixSelect))
    const number = String(formData.get(numberInput)).replace(/\s/g, '')

    setFetch({
      success: false,
      loading: true,
      error: '',
    })
    // TODO: Replace with useApi
    jsonFetch(`/${appId}/calls`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'now',
        number: prefix + number,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() =>
        setFetch({
          success: true,
          loading: false,
          error: '',
        })
      )
      .catch((err) =>
        setFetch({
          success: false,
          loading: false,
          error: 'Error pice' + err,
        })
      )
  }

  const operations = {
    handleSubmitCallNow,
  }

  const models = {
    fetch,
    countryCodeOptions: countries,
  }

  return { operations, models }
}

export { useCallNow }
