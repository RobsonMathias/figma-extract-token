import * as fs from 'fs';

export async function generateToken(outDir: string, json: any): Promise<any> {
  return new Promise(res => {
    const dir = `${process.cwd()}/${outDir}`;
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) throw err;
      fs.writeFile(
        `${dir}/figma-tokens.json`,
        JSON.stringify(json), 'utf8',
        e => res(e)
      );
    });
  });
}
