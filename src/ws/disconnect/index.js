const arc = require('@architect/functions')
const { broadcast } = require('@architect/shared/broadcast')
const { makeLogger } = require('@architect/shared/log')

const log = makeLogger('ws/disconnect')
/**
 * notes: event.requestContext.connectionId
 */
exports.handler = async function ws(event) {
  log({event})
  const timestamp = new Date().toISOString()
  const connectionId = event.requestContext.connectionId
  const data = await arc.tables()
  await data.connections.delete({connectionId, createdAt: Date.now() })
  const text = `${timestamp} - ${connectionId} - Disconnected`
  await broadcast({ text })
  return {statusCode: 200}
}
