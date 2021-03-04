const execa = require('execa')
const Listr = require('listr')
const packageFile = require('../../package.json')

const publishTag = () => ({
  title: 'Publishing Tag',
  task: () => {
    return new Listr([
      {
        title: `Creating tag: v${packageFile.version}`,
        task: () => execa('git', ['tag', packageFile.version]),
      },
      {
        title: 'Push tag',
        task: () => execa('git', ['push', 'origin', '--tags']),
      },
    ])
  },
})

module.exports = publishTag
