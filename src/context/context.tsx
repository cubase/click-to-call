import React from 'react'

import { initialState, GlobalContextState } from './initialState'

const GlobalContext = React.createContext<GlobalContextState>(initialState)

export { GlobalContext }
