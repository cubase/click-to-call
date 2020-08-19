import React, { useState } from 'react'

import { Navigation, BubbleLayout } from 'components/common'
import { useGlobalContext } from 'hooks/common'
import { isToday } from 'lib/dateHelpers'

import CallLater from 'components/forms/CallLater'
import CallNow from 'components/forms/CallNow'
import CallWebRTC from 'components/forms/CallWebRTC'

const callModules = [
  {
    label: 'Zavolat přes prohlížeč',
    value: 'callWebRtc',
    isBasedOnWorkingHours: true,
  },
  {
    label: 'Zavolejte mi nyní',
    value: 'callNow',
    isBasedOnWorkingHours: true,
  },
  {
    label: 'Zavolejte mi později',
    value: 'callLater',
  },
]

const getForm = (type: string): JSX.Element | null => {
  switch (type) {
    case 'callWebRtc':
      return <CallWebRTC />
    case 'callNow':
      return <CallNow />
    case 'callLater':
      return <CallLater />
    default:
      return null
  }
}

const getAvailableModules = (
  allowedModules: { [key: string]: boolean },
  availableTimestamps: number[]
) => {
  const isOutOfWorkingHours = availableTimestamps.every((timestamp) => !isToday(timestamp))
  return callModules.filter((callModule) => {
    if (callModule.isBasedOnWorkingHours && isOutOfWorkingHours) {
      return false
    }
    return allowedModules[callModule.value]
  })
}

type BubbleContainerProps = {
  onClose: () => void
}

const BubbleContainer = ({ onClose }: BubbleContainerProps): JSX.Element => {
  const { modules, availableTimestamps } = useGlobalContext()
  const availableModules = getAvailableModules(modules, availableTimestamps)
  const [selectedModule, setSelectedModule] = useState(availableModules[0])

  return (
    <BubbleLayout
      form={getForm(selectedModule.value)}
      navigation={
        <Navigation
          options={availableModules}
          value={selectedModule}
          onChange={setSelectedModule}
        />
      }
      onClose={onClose}
    />
  )
}

export default BubbleContainer
