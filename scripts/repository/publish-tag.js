const execa = require('execa')
const Listr = require('listr')

const publishTag = () => ({
  title: 'Publishing Tag',
  task: param => {
    return new Listr([
      {
        title: `Creating tag: v${param.version}`,
        task: () => execa('git', ['tag', `v${param.version}`]),
      },
      {
        title: 'Push tag',
        task: () => execa('git', ['push', 'origin', '--tags']),
      },
    ])
  },
})

module.exports = publishTag
