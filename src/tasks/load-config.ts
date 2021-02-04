import {requiredArgs, composeArgs} from '../helpers';
import {loadConfig} from '../services';

export const loadConfigTask = {
  title: 'Loading configurations',
  task: async () => {
    return new Promise(async (res, rej) => {
      const args = composeArgs(process.argv);
      const required = requiredArgs(['config'], args);
      if (required.length) {
        required.forEach(r => r.log());
        rej(required.map(r => r.error));
      } else {
        const json = await loadConfig(args.config);
        res(json)
      }
    })
  }
};

