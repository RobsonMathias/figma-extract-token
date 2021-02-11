import {requiredArgs, composeArgs} from '../helpers';
import {loadConfig} from '../services';
import {TasksConfig} from '../interfaces';

export const loadConfigTask = {
  title: 'Loading configurations',
  task: async ({factory}: TasksConfig) => {
    return new Promise(async (res, rej) => {
      const args = composeArgs(process.argv);
      const required = requiredArgs(['config'], args);
      if (required.length) {
        required.forEach(r => r.log());
        rej(required.map(r => r.error));
      } else {
        const config = await loadConfig(args.config);
        factory.config = config;
        res(config)
      }
    })
  }
};

