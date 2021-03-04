const execa = require('execa')
const Listr = require('listr')

const publishTag = ctx => ({
  title: 'Publishing Tag',
  task: () => {
    return new Listr([
      {
        title: `Creating tag: v${ctx.version}`,
        task: () => execa('git', ['tag', `v${ctx.version}`]),
      },
      {
        title: 'Push tag',
        task: () => execa('git', ['push', 'origin', '--tags']),
      },
    ])
  },
})

module.exports = publishTag
