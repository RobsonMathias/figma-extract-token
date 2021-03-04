const execa = require('execa')
const Listr = require('listr')
const debounce = require('./debounce')

const versioning = ctx => ({
  title: 'Versioning',
  task: async () => {
    const body = await execa('extract-pr-titles')
    const [match] = body.stdout.match(/^\w(.*)#\d+/g) || ['']
    let type = 'patch'
    if (match.toLowerCase().indexOf('[major]') > -1) {
      type = 'major'
    } else if (match.toLowerCase().indexOf('[minor]') > -1) {
      type = 'minor'
    }

    return new Listr([
      {
        title: `Checkout on branch ${ctx.branch}`,
        task: () => debounce(() => execa('git', ['checkout', ctx.branch])),
      },
      {
        title: `Creating version: ${type}`,
        task: () => debounce(() => execa('npm', ['version', type])),
      },
    ])
  },
})

module.exports = versioning
