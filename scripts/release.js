const Listr = require('listr')
const createChangeLog = require('./repository/create-changelog')
const publishTag = require('./repository/publish-tag')
const pushChanges = require('./repository/push-changes')
const versioning = require('./repository/versioning')
const packageFile = require('../package.json')

const branch = process.env.CIRCLE_BRANCH
const ctx = { version: packageFile.version, branch }

const tasks = new Listr([
  versioning(ctx),
  createChangeLog(ctx),
  pushChanges(ctx),
  publishTag(ctx),
])

tasks.run().catch(err => {
  /* eslint no-console: ["error", { allow: ["error"] }] */
  console.error(err)
})
