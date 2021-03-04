const execa = require('execa')
const Listr = require('listr')

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
        task: () => execa('git', ['checkout', ctx.branch]),
      },
      {
        title: `Creating version: ${type}`,
        task: async () => {
          await execa('npm', ['version', type])
          return new Promise(res => setTimeout(res, 500))
        },
      },
    ])
  },
})

module.exports = versioning
