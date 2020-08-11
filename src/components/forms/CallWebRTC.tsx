import React from 'react'

import { FormLayout, WebRTCButton, Flex } from 'components/common'
import { useCallWebRTC } from 'hooks/models'

const CallWebRTC = (): JSX.Element => {
  const { operations, models } = useCallWebRTC()

  return (
    <FormLayout
      form={
        <Flex alignCenter column>
          <WebRTCButton
            buttonRef={models.webrtcButtonRef}
            status={models.status}
            stream={models.rtc.stream}
            onClick={operations.handleButtonClick}
          />
          <Flex as="p">
            <strong>{models.statusText}</strong>
          </Flex>
        </Flex>
      }
      heading="Zavolejte nám přes prohlížeč, jedním kliknutím!"
    />
  )
}

export default CallWebRTC
