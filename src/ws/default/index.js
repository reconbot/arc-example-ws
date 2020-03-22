const arc = require('@architect/functions')
const { makeLogger } = require('../../../lib/log')
const log = makeLogger('ws/default')

/**
 * append a timestamp and echo the message back to the connectionId
 */
exports.handler = async (event) => {
  log({ event })
  const data = await arc.tables()

  let timestamp = new Date().toISOString()
  let connectionId = event.requestContext.connectionId
  let message = JSON.parse(event.body)
  let text = `${timestamp} - ${connectionId} - ${message.text}`

  const { Items: connections } = await data.connections.scan({})
  await Promise.all(connections.map(({ connectionId }) => {
    return arc.ws.send({ id: connectionId, payload: {text} })
  }))
  return { statusCode: 200 }
}
