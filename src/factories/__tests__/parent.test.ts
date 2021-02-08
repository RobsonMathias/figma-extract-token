import {MainFactory} from '../main';
import {CONFIG_MOCK_DEFAULT, FIGMA_MOCK_DEFAULT} from '../../__mock__';
import {Config} from '../../interfaces';
import {ParentFactory} from '../parent';


describe('ParentFactory', () => {
  it('should create foundation successfully', () => {
    const main = new MainFactory();
    main.config = CONFIG_MOCK_DEFAULT as Config;
    main.json = FIGMA_MOCK_DEFAULT as any;
    const factory = new ParentFactory(main);
    factory.call(main.config.foundation);
    expect(factory.name).toBe('Foundation');
    expect(factory.compose()).toEqual({
      foundation: {
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
            lineHeight: {value: '16px'},
            fontSize: {value: '14px'},
            fontWeight: {value: 500},
            textTransform: {value: 'uppercase'},
          }
        },
        shape: {
          rounded: {
            md: {
              value: '4px'
            },
            xs: {
              value: '16px'
            }
          }
        },
        spacing: {
          margin: {
            left: {
              1: {
                value: '4px'
              },
              2: {
                value: '8px'
              },
              3: {
                value: '16px'
              }
            },
            bottom: {
              1: {
                value: '4px'
              },
              2: {
                value: '8px'
              },
              3: {
                value: '16px'
              }
            },
            right: {
              1: {
                value: '4px'
              },
              2: {
                value: '8px'
              },
              3: {
                value: '16px'
              }
            },
            top: {
              1: {
                value: '4px'
              },
              2: {
                value: '8px'
              },
              3: {
                value: '16px'
              }
            },
          },
          padding: {
            left: {
              1: {
                value: '4px'
              },
              2: {
                value: '8px'
              },
              3: {
                value: '16px'
              }
            },
            bottom: {
              1: {
                value: '4px'
              },
              2: {
                value: '8px'
              },
              3: {
                value: '16px'
              }
            },
            right: {
              1: {
                value: '4px'
              },
              2: {
                value: '8px'
              },
              3: {
                value: '16px'
              }
            },
            top: {
              1: {
                value: '4px'
              },
              2: {
                value: '8px'
              },
              3: {
                value: '16px'
              }
            },
          }
        },
      }
    })
  });
});
