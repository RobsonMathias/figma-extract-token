import {Config} from '../interfaces';
import * as fs from 'fs';

export async function loadConfig(configFile: string): Promise<Config> {
  return new Promise((res, rej) => {
    try {
      const raw = fs.readFileSync(`${process.cwd()}/${configFile}`);
      res(JSON.parse(raw as any));
    } catch (e) {
      rej(e)
    }
  });
}
