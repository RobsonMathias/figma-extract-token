import {TasksConfig} from '../interfaces';

export const composeFoundation = {
  title: 'Composing foundation tokens',
  task: async ({factory}: TasksConfig): Promise<any> => {
    return new Promise(async (res) => {
      console.log(factory);
      res(factory.foundation.call(factory.config.foundation))
    })
  }
};

