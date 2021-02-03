
export function composeArgs(args: string[]): {[key: string]: string} {
  const result: {[key: string]: string} = {};
  args.forEach(i => {
      const regExp = new RegExp('(--)(.*)=(.*)', 'g');
      const [,,key = null,value = null] = regExp.exec(i) || [];
      if (key && value) result[key] = value;
    });
  return result;
}
