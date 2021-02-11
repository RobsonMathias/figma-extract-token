import {InitializerFactory} from '../initializer';
import {CONFIG_MOCK_DEFAULT, FIGMA_MOCK_DEFAULT} from '../../__mock__';
import {Config} from '../../interfaces';
import {ComposerFactory} from '../composer';

describe('InitializerFactory', () => {

  it('should create successfully', () => {
    const factory = new InitializerFactory();
    factory.json = FIGMA_MOCK_DEFAULT as any;
    factory.config = CONFIG_MOCK_DEFAULT as Config;
    expect(factory.foundation).toBeInstanceOf(ComposerFactory);
    expect(factory.components).toBeInstanceOf(ComposerFactory);
  });

  it('should compose json successfully', () => {
    const factory = new InitializerFactory();
    factory.json = FIGMA_MOCK_DEFAULT as any;
    factory.config = CONFIG_MOCK_DEFAULT as Config;
    expect(factory.compose()).toEqual({
      shape: {
        rounded: {
          md: {
            value: '10px'
          },
          xs: {
            value: '4px'
          }
        }
      },
      motion: {
        time: {
          "2s": {
            "value": "0.2s"
          },
          "4s": {
            "value": "0.4s"
          }
        }
      },
      spacing: {
        margin: {
          1: {
            "value": "4px"
          },
          2: {
            "value": "8px"
          },
          3: {
            "value": "16px"
          }
        },
        padding: {
          1: {
            "value": "4px"
          },
          2: {
            "value": "8px"
          },
          3: {
            "value": "16px"
          }
        }
      },
      color: {
        primary: {
          100: {value: 'rgba(188, 159, 231, 1)'},
          main: {value: 'rgba(98, 0, 238, 1)'}
        },
        secondary: {
          100: {value: 'rgba(218, 152, 199, 1)'},
          main: {value: 'rgba(169, 66, 140, 1)'}
        }
      },
      typography: {
        base: {
          fontFamily: {value: 'Roboto'},
          fontWeight: {value: 500},
          fontSize: {value: '14px'},
          lineHeight: {value: '16px'},
        },
        button: {
          lineHeight: {value: '{typography.base.lineHeight.value}'},
          fontSize: {value: '{typography.base.fontSize.value}'},
          fontWeight: {value: '{typography.base.fontWeight.value}'},
          textTransform: {value: 'uppercase'},
        }
      },
      button: {
        primaryFullMediumDefault: {
          background: {
            value: '{color.primary.100.value}'
          },
          padding: {
            value: '{spacing.padding.3.value}',
          },
          color: {
            value: '{color.primary.100.value}',
          },
          typography: {
            value: '{typography.button.value}',
          },
          rounded: {
            value: '{shape.rounded.md.value}',
          }
        },
        primaryFullMediumHover: {
          background: {
            value: '{color.primary.main.value}',
          },
          rounded: {
            value: '{shape.rounded.md.value}',
          },
          color: {
            value: '{color.primary.main.value}'
          }
        }
      }
    })
  });

});
