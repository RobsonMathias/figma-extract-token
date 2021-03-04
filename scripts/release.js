const Listr = require('listr')
const createChangeLog = require('./repository/create-changelog')
const publishTag = require('./repository/publish-tag')

const tasks = new Listr([createChangeLog(), publishTag()])

tasks.run().catch(err => {
  /* eslint no-console: ["error", { allow: ["error"] }] */
  console.error(err)
})
