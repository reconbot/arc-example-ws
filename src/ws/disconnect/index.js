const { makeLogger } = require('../../../lib/log')
const arc = require('@architect/functions')

const log = makeLogger('ws/disconnect')
/**
 * notes: event.requestContext.connectionId
 */
exports.handler = async function ws(event) {
  log({event})
  const connectionId = event.requestContext.connectionId
  const data = await arc.tables()
  await data.connections.delete({connectionId, createdAt: Date.now() })

  return {statusCode: 200}
}
