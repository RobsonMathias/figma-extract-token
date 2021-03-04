const execa = require('execa')

const createChangeLog = () => ({
  title: 'Creating Change Log',
  task: () => execa('changelog', ['generate']),
})

module.exports = createChangeLog
