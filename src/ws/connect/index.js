const { makeLogger } = require('../../../lib/log')
const arc = require('@architect/functions')

const log = makeLogger('ws/connect')
/**
 * notes:
 * - verify event.headers.Origin to enforce same-origin
 * - non 200 response will disconnect the client socket
 * - event.requestContext.connectionId for the connectionId
 */
exports.handler = async function ws(event) {
  log({event})
  const connectionId = event.requestContext.connectionId
  const data = await arc.tables()
  await data.connections.put({connectionId, createdAt: Date.now() })
  return {statusCode: 200}
}
