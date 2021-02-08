import {TasksConfig} from '../interfaces';

export const composeComponents = {
  title: 'Composing components tokens',
  task: async ({factory}: TasksConfig): Promise<any> => {
    return new Promise(async (res) => {
      res(factory.foundation.call(factory.config.components))
    })
  }
};

