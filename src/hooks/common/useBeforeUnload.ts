import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from 'hooks/common'

const useBeforeUnload = (
  preventUnload?: boolean,
  onExit?: () => void
): React.MutableRefObject<HTMLElement | null> => {
  const { appId } = useGlobalContext()
  const allowedRef = useRef<HTMLElement | null>(null)
  const ctcWindow = useRef<HTMLElement>(document.getElementById(`ctc-${appId}`))

  const handleBeforeUnload = (event: Event): string | void => {
    if (preventUnload || preventUnload === undefined) {
      event.preventDefault()
      event.returnValue = true
      return ''
    }
  }

  const handleUnload = (): void => onExit && onExit()

  const handleCTCClick = (event: Event) => {
    if (preventUnload || preventUnload === undefined) {
      if (allowedRef.current && event.target === allowedRef.current) {
        return
      }

      const confirmDialog = window.confirm('Momentálně telefonujete, přejete si ukončit Váš hovor?')
      if (confirmDialog) {
        return handleUnload()
      }
      // Prevent default action
      event.preventDefault()
      event.stopPropagation()
    }
  }

  useEffect(() => {
    if (ctcWindow.current) {
      ctcWindow.current.addEventListener('click', handleCTCClick, true)
    }

    window.addEventListener('unload', handleUnload)
    window.addEventListener('beforeunload', handleBeforeUnload)
    return (): void => {
      if (ctcWindow.current) {
        ctcWindow.current.removeEventListener('click', handleCTCClick, true)
      }

      window.removeEventListener('unload', handleUnload)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [preventUnload])

  return allowedRef
}

export { useBeforeUnload }
