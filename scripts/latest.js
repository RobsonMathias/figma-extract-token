const Listr = require('listr')
const updateLatest = require('./repository/update-latest')

const branch = process.env.CIRCLE_BRANCH
const ctx = { branch }

const tasks = new Listr([updateLatest(ctx)])

tasks.run().catch(err => {
  /* eslint no-console: ["error", { allow: ["error"] }] */
  console.error(err)
})
