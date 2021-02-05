export const CONFIG_MOCK_DEFAULT = {
  "composeName": "camelcase",
  "prefix": "$",
  "theme": {
    "name": "Theme",
    "extensionRequired": true,
    "children": {
      "Typography": {
        "__base__": {
          "fontFamily": "fontFamily",
          "lineHeightPx": "lineHeight",
          "fontSize": "fontSize",
          "fontWeight": "fontWeight"
        },
        "extract": {
          "lineHeightPx": "lineHeight",
          "fontSize": "fontSize",
          "fontWeight": "fontWeight",
          "textCase": "textTransform"
        }
      },
      "Palette": {
        "extract": ["fills"]
      }
    }
  },
  "components": {
    "name": "Components",
    "extensionRequired": true
  }
}
