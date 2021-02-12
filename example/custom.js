const StyleDictionary = require('style-dictionary')
const { Extraction } = require('../dist')

StyleDictionary.registerTransform({
  name: 'size/px', // notice: the name is an override of an existing predefined method (yes, you can do it)
  type: 'value',
  matcher: function(prop) {
    // this is an example of a possible filter (based on the "cti" values) to show how a "matcher" works
    return (
      prop.attributes.category === 'font' ||
      prop.attributes.category === 'margin'
    )
  },
  transformer: function(prop) {
    return `${prop.value}px`
  },
})

StyleDictionary.registerTransform({
  name: 'ratio/%',
  type: 'value',
  matcher: function(prop) {
    // here we are using a custom attribute, declared in the property, to match the values where apply the transform
    return prop.group === 'ratio'
  },
  transformer: function(prop) {
    return `${Math.floor(100 * prop.value)}%`
  },
})

StyleDictionary.registerTransform({
  name: 'hexRGB/hexARGB',
  type: 'value',
  matcher: function(prop) {
    return prop.group === 'color'
  },
  transformer: function(prop) {
    // for sake of simplicity, in this example we assume colors are always in the format #xxxxxx
    return prop.value.replace(/^#/, '#FF')
  },
})

StyleDictionary.registerTransform({
  name: 'unitless/dp-sp',
  type: 'value',
  matcher: function(prop) {
    return prop.group === 'typography' || prop.group === 'spacing'
  },
  transformer: function(prop) {
    // in Android font sizes are expressed in "sp" units
    const unit = prop.group === 'typography' ? 'sp' : 'dp'
    return `${prop.value}${unit}`
  },
})

// REGISTER THE CUSTOM TRANFORM GROUPS

// if you want to see what a pre-defined group contains, uncomment the next line:
// console.log(StyleDictionary.transformGroup['group_name']);

StyleDictionary.registerTransformGroup({
  name: 'reactNative',
  // notice: here the "size/px" transform is not the pre-defined one, but the custom one we have declared above
  transforms: [
    'attribute/cti',
    'name/cti/pascal',
    'size/px',
    'color/css',
    'time/seconds',
    'ratio/%',
    'hexRGB/hexARGB',
    'unitless/dp-sp',
  ],
})

Extraction.run()
