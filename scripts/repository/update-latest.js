const execa = require('execa')
const Listr = require('listr')
const debounce = require('./debounce')

const updateLatest = ctx => ({
  title: 'Updating latest',
  task: () => {
    return new Listr([
      {
        title: 'Checkout on master',
        task: () => debounce(() => execa('git', ['checkout', 'master'])),
      },
      {
        title: 'Fetch branch',
        task: () => debounce(() => execa('git', ['fetch'])),
      },
      {
        title: 'Update branch',
        task: () =>
          debounce(async () => {
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
          }),
      },
    ])
  },
})

module.exports = updateLatest
