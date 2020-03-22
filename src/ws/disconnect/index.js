const arc = require('@architect/functions')
const { makeLogger } = require('@architect/shared/log')

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
