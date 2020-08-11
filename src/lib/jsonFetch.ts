const BASE_URL = process.env.BASE_URL || 'https://ipbxapi-dev.voipex.io/ctc'

const jsonFetch = (url: string, options?: RequestInit): Promise<any> =>
  window.fetch(BASE_URL + url, options).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  })

export { jsonFetch }
