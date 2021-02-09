import {TasksConfig} from '../interfaces';

export const composeFoundation = {
  title: 'Composing foundation tokens',
  task: async ({factory}: TasksConfig): Promise<any> => {
    return new Promise(async (res) => {
      res(factory.foundation.call(factory.config.foundation))
    })
  }
};

