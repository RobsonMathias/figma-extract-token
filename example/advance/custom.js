const StyleDictionary = require('style-dictionary')
const { Extraction } = require('figma-extract-token')
const _ = require('lodash');
const fs = require('fs');

StyleDictionary.registerTransform({
  name: 'example', // notice: the name is an override of an existing predefined method (yes, you can do it)
  type: 'value',
  matcher: function(prop) {
    // this is an example of a possible filter (based on the "cti" values) to show how a "matcher" works
    return true;
  },
  transformer: function(prop) {
    return prop.value
  },
})

StyleDictionary.registerFormat({
  name: 'typescript',
  formatter: _.template(fs.readFileSync(__dirname + '/templates/ts.template'))
});

// REGISTER THE CUSTOM TRANFORM GROUPS

// if you want to see what a pre-defined group contains, uncomment the next line:
// console.log(StyleDictionary.transformGroup['group_name']);


StyleDictionary.registerTransformGroup({
  name: 'typescript',
  // notice: here the "size/px" transform is not the pre-defined one, but the custom one we have declared above
  transforms: [
    'attribute/cti',
    'name/cti/pascal',
    'example',
  ],
})

StyleDictionary.registerTransformGroup({
  name: 'reactNative',
  // notice: here the "size/px" transform is not the pre-defined one, but the custom one we have declared above
  transforms: [
    'attribute/cti',
    'name/cti/pascal',
    'example',
  ],
})

Extraction.run()
