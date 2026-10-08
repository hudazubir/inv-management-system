const apiUrl = import.meta.env.VITE_API_URL
const tokenKey = 'shelfwise_token'

export function getToken() {
  return localStorage.getItem(tokenKey)
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(tokenKey, token)
  } else {
    localStorage.removeItem(tokenKey)
  }
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(method, path, body) {
  const headers = { Accept: 'application/json' }
  const token = getToken()

  if (token) headers.Authorization = `Bearer ${token}`
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  let response

  try {
    response = await fetch(`${apiUrl}/api${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError('Unable to reach the Shelfwise server.', 0)
  }

  if (response.status === 401) setToken(null)

  const data =
    response.status === 204 ? null : await response.json().catch(() => null)

  if (!response.ok) {
    const firstFieldError =
      data?.errors && Object.values(data.errors)[0]?.[0]

    throw new ApiError(
      firstFieldError || data?.message || 'Something went wrong.',
      response.status,
    )
  }

  return data
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  delete: (path) => request('DELETE', path),
}
