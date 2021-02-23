export const CONFIG_MOCK_DEFAULT = {
  dictionaryConfig: './config.json',
  outDir: './build',
  foundation: {
    name: 'Foundation',
    children: {
      Font: {
        children: {
          Size: {
            extract: ['fontSize'],
          },
          Family: {
            extract: ['fontFamily'],
          },
          Weight: {
            extract: ['fontWeight'],
          },
        },
      },
      'Letter Spacing': {
        extract: ['letterSpacing'],
      },
      'Line Height': {
        extract: {
          lineHeightPx: 'lineHeight',
        },
      },
      Color: {
        extract: ['fills'],
      },
      Margin: {
        extract: ['width'],
      },
      Padding: {
        extract: ['width'],
      },
      Shape: {
        extract: {
          cornerRadius: 'borderRadius',
        },
      },
      Radius: {
        extract: {
          cornerRadius: 'borderRadius',
        },
      },
      Motion: {
        extract: ['characters'],
      },
      Opacity: {
        extract: ['opacity'],
      },
      Stroke: {
        extract: {
          strokeWeight: 'width',
        },
      },
      Shadow: {
        extract: ['dropShadow'],
      },
    },
  },
  components: {
    name: 'Components',
    inheritance: {
      dropShadow: 'shadow',
      fills: 'color',
      lineHeightPx: 'lineHeight',
      letterSpacing: 'letterSpacing',
      fontSize: {
        convert: 'size',
        ref: 'font.size',
      },
      fontFamily: {
        convert: 'family',
        ref: 'font.family',
      },
      fontWeight: {
        convert: 'weight',
        ref: 'font.weight',
      },
      textCase: 'textTransform',
      cornerRadius: 'radius',
      vector: {
        convert: 'size',
        ref: 'font.size',
      },
    },
  },
}
