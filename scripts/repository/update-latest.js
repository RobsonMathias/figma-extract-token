const execa = require('execa')
const Listr = require('listr')

const updateLatest = ctx => ({
  title: 'Updating latest',
  task: () => {
    return new Listr([
      {
        title: 'Checkout on master',
        task: () => execa('git', ['checkout', 'master']),
      },
      {
        title: 'Fetch branch',
        task: () => execa('git', ['fetch']),
      },
      {
        title: 'Update branch',
        task: async () => {
          const branchList = await execa('git', ['branch'])
          const match = branchList.stdout.match(/v\d.x/gm) || [ctx.branch]
          const branch = match.sort()[match.length - 1]
          await execa('git', [
            'pull',
            'origin',
            branch,
            '--no-ff',
            '--no-commit',
          ])
          return execa('git', ['push', 'origin', 'master'])
        },
      },
    ])
  },
})

module.exports = updateLatest
