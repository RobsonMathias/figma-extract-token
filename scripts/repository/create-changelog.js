const execa = require('execa')
const debounce = require('./debounce')

const createChangeLog = () => ({
  title: 'Creating Change Log',
  task: () => debounce(() => execa('changelog', ['generate'])),
})

module.exports = createChangeLog
