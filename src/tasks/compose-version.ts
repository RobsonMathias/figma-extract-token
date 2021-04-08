import { TasksConfig } from '../interfaces'
import { generateJson } from '../services'
import { composeArgs } from '../helpers'

export const composeVersion = {
  title: 'Composing version',
  skip: () => {
    const { versioning } = composeArgs(process.argv, process.env)
    return !versioning
  },
  task: async ({ factory }: TasksConfig): Promise<any> => {
    return new Promise(async res => {
      const json = factory.version.compose() as any
      await generateJson(factory.config.outDir, json, 'VERSION')
      res(json)
    })
  },
}
