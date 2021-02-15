import * as fs from 'fs';
import {loadConfig} from './load-config';

export async function loadMultipleConfig(path: string, match: RegExp): Promise<any[]> {
  return new Promise(async (res, rej) => {
    try {
      const directoryPath = path.replace(/\*+\/?(.*)/g, '');
      fs.readdir(`${process.cwd()}/${directoryPath}`, async (err, files) => {
        if (err) {
          return console.log('Unable to scan directory: ' + err);
        }
        const filtered = files.filter(f => f.match(match));
        const result = await Promise.all(filtered.map(f =>
          loadConfig(`/${directoryPath}${f}`)
        ));
        res(result);
      });
    } catch (e) {
      rej(e)
    }
  });
}
