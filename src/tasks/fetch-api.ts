import {composeArgs, requiredArgs} from '../helpers';
import {fetchApi} from '../services';

export const fetchApiTask = {
  title: 'Fetching Figma API JSON',
  task: async () => {
    return new Promise(async (res, rej) => {
      const args = composeArgs(process.argv);
      const required = requiredArgs(['token', 'document'], args);
      if (required.length) {
        required.forEach(r => r.log());
        rej(required.map(r => r.error));
      } else {
        const json = await fetchApi(args.token, args.document);
        res(json)
      }
    })
  }
};

