import { API_BASE_URL } from './config'
const USER = 'user'

const required = (param) => {
  throw new Error(`${param} is required`)
}

const setDefaultOptions = ({
  method = required('HTTP Request Method'),
  url = required('URL'),
  params = {},
  data = {},
  signal = null,
  headers = new Headers(),
  ...options
} = {}) => ({
  method,
  url,
  params,
  signal,
  headers,
  data,
  ...options,
})

const setData = ({ method, data, ...options }) => {
  if (method !== 'GET') {
    if (!options.isStreamData) options.body = JSON.stringify(data)
    else options.body = data
  }
  return {
    method,
    ...options,
  }
}

const buildUrl = ({ url, params }) => {
  // Create a query string using any passed in parameters
  const paramKeys = Object.keys(params)
  let fullUrl = `${API_BASE_URL}/${url}`
  if (paramKeys.length > 0) {
    fullUrl += `?${paramKeys.map((key) => `${key}=${params[key]}`).join('&')}`
  }
  return fullUrl
}

const addAuth = ({ headers = new Headers(), ...options }) => {
  const user = JSON.parse(window.sessionStorage.getItem(USER))
  if (user) {
    headers.append('Authorization', `Bearer ${user.token}`)
    headers.append('loggedInUserid', user.id)
  }
  return {
    headers,
    ...options,
  }
}

export const ApiHandlerRaw = ({ ...originalOptions }) => {
  const options = setData(addAuth(setDefaultOptions(originalOptions)))
  return fetch(buildUrl(options), options)
    .then((res) => {
      if (!res.ok) {
        throw res
      }
      return Promise.resolve(res)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export const ApiHandler = ({ headers = new Headers(), ...options }) => {
  headers.append('Content-Type', 'application/json')
  return ApiHandlerRaw({
    headers,
    ...options,
  })
    .then((res) => res.json())
    .catch((error) => {
      throw error
    })
}

export const FileUploadApiHandler = async ({ headers = new Headers(), ...options }) => {
  const response = await ApiHandlerRaw({
    headers,
    isStreamData: true,
    ...options,
  })
  if (options.params && options.params.isBlobType) return response.blob()
  return response.json()
}
