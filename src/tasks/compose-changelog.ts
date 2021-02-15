import {TasksConfig} from '../interfaces';
import {generateJson} from '../services';

export const composeChangelog = {
  title: 'Composing Change Logs',
  task: async ({factory}: TasksConfig): Promise<any> => {
    return new Promise(async (res) => {
      await generateJson(factory.config.outDir, factory.version.json as any, 'CHANGELOG');
      res(factory.version.json);
    })
  }
};

