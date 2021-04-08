import { composeArgs, requiredArgs } from '../helpers'
import { fetchApi, fetchVersion } from '../services'
import { TasksConfig } from '../interfaces'

export const fetchApiTask = {
  title: 'Fetching Figma API JSON',
  task: async ({ factory }: TasksConfig) => {
    return new Promise(async (res, rej) => {
      const args = composeArgs(process.argv, process.env)
      const required = requiredArgs(['token', 'document'], args)
      if (required.length) {
        required.forEach(r => r.log())
        rej(required.map(r => r.error))
      } else {
        const json = await fetchApi(args.token, args.document)
        const version = await fetchVersion(args.token, args.document)
        factory.json = json.data
        factory.version.call(version.data)
        res(json)
      }
    })
  },
}
