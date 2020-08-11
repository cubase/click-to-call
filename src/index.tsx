import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { jsonFetch } from 'lib/jsonFetch'
import { initialState, GlobalContextState } from 'context'

declare global {
  interface Window {
    _ipex_ctc_: any
  }
}

// Browser IIFE
;(function (window, document): void {
  const isMobile = (): boolean => /Mobi|Android/i.test(window.navigator.userAgent)
  const isWebRTCSupported = (): boolean =>
    ['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection', 'RTCIceGatherer'].some(
      (item) => item in window
    )

  const verifyRegistration = <T extends GlobalContextState>(
    data: T
  ): GlobalContextState | never => {
    if (typeof data === 'object' && !Array.isArray(data)) {
      Object.keys(initialState).forEach((key) => {
        if (!(key in data)) {
          throw new TypeError(`Registration object is not valid - missing key ${key}`)
        }
      })
      return data
    } else {
      throw new TypeError('Registration object is not valid - data is not a function')
    }
  }

  const register = (appId: string): Promise<GlobalContextState> =>
    jsonFetch(`/${appId}`).then(verifyRegistration)

  const render = (appState: GlobalContextState): void => {
    const ctc = document.createElement('ipex-clicktocall')
    document.body.appendChild(ctc)
    ReactDOM.render(<App context={appState} />, ctc)
  }

  if (!isWebRTCSupported() || isMobile()) {
    return console.error(
      '[CTC] WebRTC is not supported in your browser or you are using a mobile version of browser'
    )
  }

  if (!window.fetch) {
    return console.error('[CTC] Fetch is not supported in your browser, skipping render')
  }

  // Find CTC configuration and register widget
  if (window._ipex_ctc_) {
    register(window._ipex_ctc_._id)
      .then((data) => render(data))
      .catch((error) => console.error('[CTC]', error))
  }
})(window, document)
