import { useContext } from 'react'

import { GlobalContext, GlobalContextState } from 'context'

const useGlobalContext = (): GlobalContextState => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('[GlobalContext] useGlobalContext has to be within GlobalContext provider')
  }

  return context
}

export { useGlobalContext }
