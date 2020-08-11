import { useState } from 'react'
import { useGlobalContext } from 'hooks/common'

import { jsonFetch } from 'lib/jsonFetch'
import { ConcernSeparationHook } from 'hooks/models/types'
import { getWeekDayFromDate, getHoursAndMinutesFromDate } from 'lib/dateHelpers'

type CallLaterOperations = {
  handleSubmitCallLater: (event: React.SyntheticEvent<HTMLFormElement>) => void
  handleChangeDay: (value: any) => void
}

type TimeSelectOption = {
  label: string
  value: string | number
}

type CallLaterModels = {
  fetch: {
    loading: boolean
    success: boolean
    error: string
  }
  dayOptions: TimeSelectOption[]
  timeOptions: TimeSelectOption[]
  selectedDay: string | number
  countryCodeOptions: Array<{
    country: string
    code: string
  }>
}

const generateDayTimeOptions = (timestamps: number[]) =>
  timestamps.reduce<{ [key: string]: TimeSelectOption[] }>((acc, timestamp) => {
    const weekDay = getWeekDayFromDate(timestamp)
    const option = {
      label: getHoursAndMinutesFromDate(timestamp),
      value: timestamp,
    }

    if (!Array.isArray(acc[weekDay])) {
      acc[weekDay] = [option]
    } else {
      acc[weekDay].push(option)
    }

    return acc
  }, {})

type CallLaterInput = {
  timeInput: string
  prefixSelect: string
  numberInput: string
}

const useCallLater: ConcernSeparationHook<CallLaterOperations, CallLaterModels, CallLaterInput> = ({
  prefixSelect,
  numberInput,
  timeInput,
}) => {
  const { appId, token, availableTimestamps, countries } = useGlobalContext()
  const dateTimeMap = generateDayTimeOptions(availableTimestamps)
  const dayOptions = Object.keys(dateTimeMap).map((key) => ({
    label: key,
    value: key,
  }))
  const [selectedDay, setSelectedDay] = useState(dayOptions[0].value)
  const [fetch, setFetch] = useState({
    loading: false,
    success: false,
    error: '',
  })

  const handleSubmitCallLater = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    const formData = new FormData(event.currentTarget)
    const timestamp = formData.get(timeInput)
    const prefix = String(formData.get(prefixSelect))
    const number = String(formData.get(numberInput)).replace(/\s/g, '')

    setFetch({ success: false, loading: true, error: '' })

    // Replace with useApi
    jsonFetch(`/${appId}/calls`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'scheduled',
        timestamp,
        number: prefix + number,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => setFetch({ success: true, loading: false, error: '' }))
      .catch((err) => setFetch({ success: false, loading: false, error: '[CTC] Error ' + err }))
  }

  const handleChangeDay = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setSelectedDay(event.currentTarget.value)
  }

  const operations = {
    handleSubmitCallLater,
    handleChangeDay,
  }

  const models = {
    fetch,
    selectedDay,
    dayOptions,
    timeOptions: dateTimeMap[selectedDay],
    countryCodeOptions: countries,
  }

  return { operations, models }
}

export { useCallLater }
