import { TasksConfig } from '../interfaces'
import { loadConfig } from '../services'
import { composeArgs, debounce } from '../helpers'
import { loadMultipleConfig } from '../services/load-multiple-config'

export const versioning = {
  title: 'Verify versioning',
  skip: () => {
    const { versioning } = composeArgs(process.argv, process.env)
    return !versioning
  },
  task: async ({ factory }: TasksConfig) => {
    const { versioning } = composeArgs(process.argv, process.env)
    if (!versioning) return
    return new Promise(async res => {
      const config = (await loadConfig(factory.config.dictionaryConfig)) as any
      const files = await Promise.all(
        config.source.map((f: string) =>
          loadMultipleConfig(f, /.tokens.json/g),
        ),
      )
      const mapped = files.reduce((prev: unknown = [], current: unknown) => {
        //@ts-ignore
        return [...prev, ...current]
      })
      factory.version.cloneFiles(mapped as any)
      debounce(() => res(files))
    })
  },
}
