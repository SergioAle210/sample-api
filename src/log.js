/* eslint-disable no-console */
const logError = (message) => {
  const now = new Date()
  console.log(message, now.toISOString())
}

const request = (method, path, body) => {
  const now = new Date()
  console.log('[REQUEST]', now.toISOString(), method, path, body)
}

const response = (method, path, body) => {
  const now = new Date()
  console.log('[RESPONSE]', now.toISOString(), method, path, body)
}

export { logError, request, response }
