const execa = require('execa')
const Listr = require('listr')
const packageFile = require('../../package.json')

const pushChanges = ctx => ({
  title: 'Push changes',
  task: params => {
    params.version = packageFile.version
    return new Listr([
      {
        title: 'Add files',
        task: () => execa('git', ['add', '.']),
      },
      {
        title: 'Commit changes',
        task: () =>
          execa('git', [
            'commit',
            '-n',
            '-am',
            `publish(auto): publishing version v${params.version} [ci skip]`,
          ]),
      },
      {
        title: 'Push branch',
        task: () => execa('git', ['push', 'origin', ctx.branch, '--quiet']),
      },
    ])
  },
})

module.exports = pushChanges
