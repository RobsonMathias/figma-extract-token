import {TasksConfig} from '../interfaces';

export const composeTheme = {
  title: 'Composing theme tokens',
  task: async ({factory}: TasksConfig): Promise<any> => {
    return new Promise(async (res) => {
      res(factory.theme.call(factory.config.theme.name))
    })
  }
};

