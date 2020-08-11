export type GlobalContextState = {
  appId: string
  token: string
  domain: string
  countries: Array<{
    country: string
    code: string
  }>
  availableTimestamps: number[]
  modules: {
    callLater: boolean
    callNow: boolean
    callWebRTC: boolean
  }
  theme: {
    color: string
    position: 'left' | 'right'
  }
  webrtc?: {
    hostname: string
    name: string
    secret: string
    number: string
  }
}

const initialState: GlobalContextState = {
  appId: '',
  token: '',
  domain: '',
  countries: [],
  availableTimestamps: [],
  modules: {
    callLater: false,
    callNow: false,
    callWebRTC: false,
  },
  theme: {
    color: 'blue',
    position: 'left',
  },
}

export { initialState }
