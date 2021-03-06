const execa = require('execa')
const Listr = require('listr')
const debounce = require('./debounce')

const publishTag = () => ({
  title: 'Publishing Tag',
  task: param => {
    return new Listr([
      {
        title: `Creating tag: v${param.version}`,
        task: () => debounce(() => execa('git', ['tag', `v${param.version}`])),
      },
      {
        title: 'Push tag',
        task: () => debounce(() => execa('git', ['push', 'origin', '--tags'])),
      },
    ])
  },
})

module.exports = publishTag
