import React, { useState } from 'react'

import { Navigation, BubbleLayout } from 'components/common'
import { useGlobalContext } from 'hooks/common'

import CallLater from 'components/forms/CallLater'
import CallNow from 'components/forms/CallNow'
import CallWebRTC from 'components/forms/CallWebRTC'

const callModules = [
  {
    label: 'Zavolat přes prohlížeč',
    value: 'callWebRtc',
  },
  {
    label: 'Zavolejte mi nyní',
    value: 'callNow',
  },
  {
    label: 'Zavolejte mi později',
    value: 'callLater',
  },
]

const renderForm = (module: string): JSX.Element | null => {
  switch (module) {
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

const getAvailableModules = (allowedModules: { [key: string]: boolean }) =>
  callModules.filter((callModule) => allowedModules[callModule.value])

type BubbleWrapperProps = {
  onClose: () => void
}

const BubbleWrapper = ({ onClose }: BubbleWrapperProps): JSX.Element => {
  const { modules } = useGlobalContext()
  const availableModules = getAvailableModules(modules)
  const [selectedModule, setSelectedModule] = useState(availableModules[0])

  return (
    <BubbleLayout
      form={renderForm(selectedModule.value)}
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

export default BubbleWrapper
