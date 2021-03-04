const execa = require('execa')
const Listr = require('listr')

const versioning = () => ({
  title: 'Versioning',
  task: () => {
    return new Listr([
      {
        title: 'Push tag',
        task: () => {
          execa('extract-pr-titles')
        },
      },
    ])
  },
})

module.exports = versioning
