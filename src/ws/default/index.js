const { broadcast } = require('@architect/shared/broadcast')
const { makeLogger } = require('@architect/shared/log')
const log = makeLogger('ws/default')

/**
 * append a timestamp and echo the message back to the connectionId
 */
exports.handler = async (event) => {
  log({ event })

  const timestamp = new Date().toISOString()
  const connectionId = event.requestContext.connectionId
  const message = JSON.parse(event.body)
  const text = `${timestamp} - ${connectionId} - ${message.text}`

  await broadcast({ text })
  return { statusCode: 200 }
}
