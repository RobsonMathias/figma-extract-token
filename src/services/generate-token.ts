import * as fs from 'fs';

export async function generateToken(outDir: string, json: object[], name: string): Promise<any> {
  return new Promise(res => {
    const dir = `${process.cwd()}/${outDir}`;
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) throw err;
      fs.writeFile(
        `${dir}/${name}.tokens.json`,
        JSON.stringify(json), 'utf8',
        e => res(e)
      );
    });
  });
}
