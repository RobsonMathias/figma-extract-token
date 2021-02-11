import {TasksConfig} from '../interfaces';
import {build} from '../__experiment__/dictionary-build';

export const runDictionary = {
  title: 'Running dictionary',
  task: async ({factory}: TasksConfig): Promise<any> => {
    return build()
  }
};

