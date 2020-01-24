import registerCustomElement from 'preact-custom-element'
import { ClickToCall } from './click-to-call'
;(function(document): void {
  // Register custom web component
  registerCustomElement(ClickToCall, 'x-clicktocall')
  // Runs immediately with data- configuration after script is loaded
  const currentScript = document.currentScript
  if (currentScript !== null && currentScript.dataset) {
    const scriptDataset = Object.entries(currentScript.dataset)
    if (!scriptDataset.length) {
      return console.error(
        '[CTC] No configuration found. Did you forget to add data attributes into this script?',
        'https://github.com/cubase/call-to-webrtc'
      )
    }
    const ctc = document.createElement('x-clicktocall')
    scriptDataset.forEach(([key, value]) => value && ctc.setAttribute(key, value))
    document.body.appendChild(ctc)
  }
})(document)
