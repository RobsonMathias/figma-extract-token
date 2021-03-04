const execa = require('execa')
const Listr = require('listr')

const versioning = ctx => ({
  title: 'Versioning',
  task: async () => {
    const body = await execa('extract-pr-titles')
    const [match] = body.stdout.match(/^\w(.*)#\d+/g) || ['']
    let type = 'minor'
    if (match.toLowerCase().indexOf('[major]') > -1) {
      type = 'major'
    } else if (match.toLowerCase().indexOf('[patch]') > -1) {
      type = 'patch'
    }

    return new Listr([
      {
        title: `Checkout on branch ${ctx.branch}`,
        task: () => execa('git', ['checkout', ctx.branch]),
      },
      {
        title: `Creating version: type`,
        task: () => execa('npm', ['version', type]),
      },
    ])
  },
})

module.exports = versioning
