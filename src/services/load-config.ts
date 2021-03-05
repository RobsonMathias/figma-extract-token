import * as fs from 'fs'

export async function loadConfig(path: string): Promise<any> {
  return new Promise((res, rej) => {
    try {
      const raw = fs.readFileSync(`${process.cwd()}/${path}`)
      res(JSON.parse(raw as any))
    } catch (e) {
      rej(e)
    }
  })
}
