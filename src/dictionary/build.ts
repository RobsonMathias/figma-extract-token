export function build(config: object|string, StyleDictionary?: any) {
  const Dictionary = StyleDictionary || require('style-dictionary').extend(config);
  return new Promise(async (res) => {
    Dictionary.buildAllPlatforms();
    res();
  });
}
