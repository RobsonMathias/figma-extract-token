import {TasksConfig} from '../interfaces';
import {generateToken} from '../services';

export const composeToken = {
  title: 'Composing tokens',
  task: async ({factory}: TasksConfig): Promise<any> => {
    return new Promise(async (res) => {
      const json = factory.compose() as any;
      await generateToken(factory.config.outDir, json.foundation, '_foundation');
      await generateToken(factory.config.outDir, json.components, 'components');
      res(json);
    })
  }
};

