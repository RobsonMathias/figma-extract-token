import { TasksConfig } from '../interfaces'
import { generateJson } from '../services'

export const composeToken = {
  title: 'Composing tokens',
  task: async ({ factory }: TasksConfig): Promise<any> => {
    return new Promise(async res => {
      const json = factory.compose() as any
      await generateJson(
        factory.config.outDir,
        json.foundation,
        '_foundation.tokens',
      )
      await generateJson(
        factory.config.outDir,
        json.components,
        'components.tokens',
      )
      res(json)
    })
  },
}
