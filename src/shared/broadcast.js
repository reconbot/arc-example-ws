const arc = require('@architect/functions')
const { makeLogger } = require('@architect/shared/log')
const log = makeLogger('ws/broadcast')

const broadcast = async payload => {
  log({ payload })
  const data = await arc.tables()
  const { Items: connections } = await data.connections.scan({})
  await Promise.all(connections.map(({ connectionId }) => {
    return arc.ws.send({ id: connectionId, payload }).catch(async e => {
      if (e.statusCode === 410) {
        log(`${connectionId} gone, deleting`)
        await data.connections.delete({ connectionId })
      } else {
        throw e
      }
    })
  }))
}

module.exports = {
  broadcast
}
