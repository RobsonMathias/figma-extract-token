export const CONFIG_MOCK_MATERIAL = {
  dictionaryConfig: '/scripts/config.json',
  outDir: './src',
  foundation: {
    name: 'Foundation',
    children: {
      breakpoints: {
        extract: ['characters'],
      },
      direction: {
        extract: ['characters'],
      },
      palette: {
        extract: ['fills'],
      },
      shape: {
        extract: {
          cornerRadius: 'radius',
        },
      },
      shadow: {
        extract: ['dropShadow'],
      },
      font: {
        children: {
          size: {
            extract: ['fontSize'],
          },
          family: {
            extract: ['fontFamily'],
          },
          weight: {
            extract: ['fontWeight'],
          },
        },
      },
      'letter spacing': {
        extract: ['letterSpacing'],
      },
      'line height': {
        extract: {
          lineHeightPx: 'lineHeight',
        },
      },
      transitions: {
        extract: ['characters'],
      },
      zIndex: {
        extract: ['characters'],
      },
    },
  },
  components: {
    name: 'Components',
    inheritance: {
      fills: {
        force: true,
        convert: 'color',
      },
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
      cornerRadius: 'shape',
      fontWeight: {
        convert: 'weight',
        ref: 'font.weight',
      },
      textCase: 'textTransform',
      icon: {
        convert: 'size',
        ref: 'font.size',
      },
      dropShadow: 'shadow',
    },
  },
}
