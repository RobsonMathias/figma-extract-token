const execa = require('execa')
const Listr = require('listr')

const publishTag = () => ({
  title: 'Publishing Tag',
  task: ctx => {
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
