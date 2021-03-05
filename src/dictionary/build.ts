export function build(config: object | string) {
  const Dictionary = require('style-dictionary').extend(config)
  return new Promise(async res => {
    Dictionary.buildAllPlatforms()
    res()
  })
}
