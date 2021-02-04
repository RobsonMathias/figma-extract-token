
export interface Errors {
  log: () => void;
  error: Error;
}

export function requiredArgs(required: string[], args: {[key: string]: string}): Errors[]  {
  return required.filter((key: string) => !args[key])
    .map((key: string) => ({
      log: () => console.error(`Missing argument: "${key}" is required`),
      error: new Error(`Missing argument: "${key}" is required`)
    }))
}
