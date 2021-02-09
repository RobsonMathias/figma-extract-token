export const CONFIG_MOCK_DEFAULT = {
  "foundation": {
    "name": "Foundation",
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
      "Color": {
        "extract": ["fills"]
      },
      "Spacing": {
        "children": {
          "Padding": {
            "extract": ["width"],
            "variant": ["left", "top", "right", "bottom"]
          },
          "Margin": {
            "extract": ["width"],
            "variant": ["left", "top", "right", "bottom"]
          }
        }
      },
      "Shape": {
        "extract": {
          "cornerRadius": "borderRadius"
        }
      },
      "Motion": {
        "extract": ["characters"]
      }
    }
  },
  "components": {
    "name": "Components",
    "inheritance": ["Color", "Shape"]
}
}
;
