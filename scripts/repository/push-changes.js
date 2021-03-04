const execa = require('execa')
const Listr = require('listr')

const pushChanges = () => ({
  title: 'Push changes',
  task: ctx => {
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
            `ci(publish): publishing version v${ctx.version}`,
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
