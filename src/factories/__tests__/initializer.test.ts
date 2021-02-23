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
    const composed = factory.compose();
    expect(composed.foundation).toBeTruthy();
    expect(composed.components).toBeTruthy();
  });

  it('should compose foundation successfully', () => {
    const factory = new InitializerFactory();
    factory.json = FIGMA_MOCK_DEFAULT as any;
    factory.config = CONFIG_MOCK_DEFAULT as Config;
    const composed = factory.compose();
    const spacing = {
      1: {
        "value": "6px",
        type: 'foundation',
      },
      2: {
        "value": "12px",
        type: 'foundation',
      },
      3: {
        "value": "24px",
        type: 'foundation',
      }
    };
    expect(composed.foundation).toEqual({
      radius: {
        pill: {
          value: "500px 500px 500px 500px",
          type: 'foundation',
        },
        round: {
          value: "50px 50px 50px 50px",
          type: 'foundation',
        },
        xl: {
          value: "10px 10px 10px 10px",
          type: 'foundation',
        }
      },
      motion: {
        time: {
          "2s": {
            "value": "0.2s",
            type: 'foundation',
          },
          "4s": {
            "value": "0.4s",
            type: 'foundation',
          }
        }
      },
      margin: {
        x: spacing,
        y: spacing,
        left: spacing,
        right: spacing,
        top: spacing,
        bottom: spacing
      },
      padding: {
        x: spacing,
        y: spacing,
        left: spacing,
        right: spacing,
        top: spacing,
        bottom: spacing
      },
      opacity: {
        '3xl': {
          value: '0.950',
          type: 'foundation',
        },
        'xs': {
          value: '0.050',
          type: 'foundation',
        }
      },
      stroke: {
        width: {
          lg: {
            value: '8px',
            type: 'foundation',
          },
          xs: {
            value: '1px',
            type: 'foundation',
          }
        }
      },
      shadow: {
        lg: {
          value: '0px 28px 64px rgba(20, 20, 20, 0.16)',
          type: 'foundation',
        },
        xs: {
          value: '0px 2px 5px rgba(199, 206, 201, 0.16)',
          type: 'foundation',
        }
      },
      color: {
        primary: {
          100: {
            value: 'rgba(188, 159, 231, 1)',
            deprecated: true,
          type: 'foundation',
          },
          main: {
            value: 'rgba(98, 0, 238, 1)',
            type: 'foundation',
          }
        },
        secondary: {
          100: {
            value: 'rgba(218, 152, 199, 1)',
            type: 'foundation',
          },
          main: {
            value: 'rgba(169, 66, 140, 1)',
            type: 'foundation',
          }
        }
      },
      font: {
        weight: {
          lg: {
            value: 700,
            type: 'foundation',
          },
          md: {
            value: 500,
            type: 'foundation',
          },
          xs: {
            value: 300,
            type: 'foundation',
          },
        },
        size: {
          '10xl': {
            value: '72px',
            type: 'foundation',
          },
          'lg': {
            value: '32px',
            type: 'foundation',
          },
          md: {
            value: '16px',
            type: 'foundation',
          },
          xs: {
            value: '12px',
            type: 'foundation',
          },
        },
        family: {
          base: {
            value: 'Roboto',
            type: 'foundation',
          },
        },
      },
      letterSpacing: {
        xs: {
          value: '0.3',
          type: 'foundation',
        },
        md: {
          value:  '1.5',
          type: 'foundation',
        }
      },
      lineHeight: {
        '8xl': {
          value: '96px',
          type: 'foundation',
        },
        sm: {
          value:  '20px',
          type: 'foundation',
        },
        xs: {
          value:  '16px',
          type: 'foundation',
        }
      },
    })
  });

  it('should compose components successfully', () => {
    const factory = new InitializerFactory();
    factory.json = FIGMA_MOCK_DEFAULT as any;
    factory.config = CONFIG_MOCK_DEFAULT as Config;
    const composed = factory.compose();
    expect(composed.components).toEqual({
      button: {
        primaryFullLarge: {
          color: {
            value: '{color.primary.main.value}',
            comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
            type: 'components',
          },
          font: {
            lineHeight: {
              value: '{lineHeight.sm.value}',
              comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
              type: 'components',
            },
            letterSpacing: {
              value: '{letterSpacing.xs.value}',
              comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
              type: 'components',
            },
            size: {
              value: '{font.size.md.value}',
              comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
              type: 'components',
            },
            weight: {
              value: '{font.weight.md.value}',
              comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
              type: 'components',
            },
            family: {
              value: '{font.family.base.value}',
              comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
              type: 'components',
            },
          },
          paddingY: {
            comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
            type: "components",
            value: "{padding.y.2.value}"
          },
          paddingX: {
            comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
            type: "components",
            value: "{padding.x.3.value}"
          },
          radius: {
            value: '{radius.xl.value}',
            comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
            type: 'components',
          },
          icon: {
            marginLeft: {
              value: '{margin.left.3.value}',
              comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
              type: 'components',
            },
            size: {
              value: '{font.size.lg.value}',
              comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
              type: 'components',
            }
          },
        },
        primaryFullLargeHover: {
          color: {
            value: '{color.primary.100.value}',
            comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
            type: 'components',
          },
          shadow: {
            value: '{shadow.lg.value}',
            comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
            type: 'components',
          },
        },
        primaryFullLargePressed: {
          opacity: {
            value: '{opacity.xs.value}',
            comment: "Use when we have one action in page, or priority actions, for example: ”simulate now”, ”enter”, ”continue”.",
            deprecated: true,
            type: 'components',
          },
        }
      },
      icons: {
        large: {
          marginX: {
            type: 'components',
            value: '{margin.x.1.value}',
          },
          marginY: {
            type: 'components',
            value: '{margin.y.1.value}',
          },
          size: {
            type: 'components',
            value: '{font.size.lg.value}'
          }
        }
      }
    })
  });

});
