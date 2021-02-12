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
      foundation: {
        radius: {
          pill: {
            value: "500px 500px 500px 500px"
          },
          round: {
            value: "50px 50px 50px 50px"
          },
          xl: {
            value: "10px 10px 10px 10px"
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
        opacity: {
          '3xl': {value: '0.950'},
          'xs': {value: '0.050'}
        },
        stroke: {
          width: {
            lg: {value: '8px'},
            xs: {value: '1px'}
          }
        },
        shadow: {
          lg: {value: '0px 28px 64px rgba(20, 20, 20, 0.16)'},
          xs: {value: '0px 2px 5px rgba(199, 206, 201, 0.16)'}
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
          text: {
            fontSize: {
              value: "{typography.base.fontSize.value}"
            },
            fontWeight: {
              value: "{typography.base.fontWeight.value}"
            },
            lineHeight: {
              value: "{typography.base.lineHeight.value}"
            },
            textTransform: {
              value: "uppercase"
            }
          },
          small: {
            button: {
              lineHeight: {value: '16px'},
              fontSize: {value: '14px'},
              fontWeight: {value: 500},
              textTransform: {value: 'uppercase'},
            }
          }
        },
      },
      components: {
        button: {
          primaryFullMediumDefault: {
            background: {
              value: '{color.primary.100.value}'
            },
            spacing: {
              value: '{spacing.padding.3.value}',
            },
            color: {
              value: '{color.primary.100.value}',
            },
            typography: {
              lineHeight: {value: '{typography.small.button.lineHeight.value}'},
              fontSize: {value: '{typography.small.button.fontSize.value}'},
              fontWeight: {value: '{typography.small.button.fontWeight.value}'},
              textTransform: {value: '{typography.small.button.textTransform.value}'},
            },
            radius: {
              value: '{radius.xl.value}',
            }
          },
          primaryFullMediumHover: {
            background: {
              value: '{color.primary.main.value}',
            },
            radius: {
              value: '{radius.xl.value}',
            },
            color: {
              value: '{color.primary.main.value}'
            }
          }
        }
      }
    })
  });

});
