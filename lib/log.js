const { inspect } = require('util')
const makeLogger = label => (data, ...meta) => {
  console.log(inspect({
    timestamp: Date.now(),
    label,
    data,
    ...(meta.length > 0 && { meta: meta })
  }, false, 20))
}

module.exports = {
  makeLogger
}
