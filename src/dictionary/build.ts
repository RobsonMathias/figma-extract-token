export function build(config: object|string) {
  const StyleDictionary = require('style-dictionary').extend(config);
  return new Promise(async (res) => {
    StyleDictionary.buildAllPlatforms();
    res();
  });
}
