export const CONFIG_MOCK_DEFAULT = {
  "dictionaryConfig": "./dictionaryConfig.json",
  "outDir": "./dist",
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
    "inheritance": {
      "fills":  "color",
      "lineHeightPx": "lineHeight",
      "letterSpacing": "letterSpacing",
      "fontSize": "fontSize",
      "fontFamily": "fontFamily",
      "fontWeight": "fontWeight",
      "textCase": "textTransform",
      "cornerRadius": "rounded",
      "background": "background"
    }
  }
};
