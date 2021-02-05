import {MainFactory} from '../main';
import {CONFIG_MOCK_DEFAULT, FIGMA_MOCK_DEFAULT} from '../../__mock__';
import {Config} from '../../interfaces';
import {ParentFactory} from '../parent';


describe('ParentFactory', () => {
  it('should create successfully', () => {
    const main = new MainFactory();
    main.config = CONFIG_MOCK_DEFAULT as Config;
    main.json = FIGMA_MOCK_DEFAULT as any;
    const factory = new ParentFactory(main);
    factory.call(main.config.theme);
    expect(factory.name).toBe('Theme');
    expect(factory.compose()).toEqual({
      typography: {
        base: {
          fontFamily: {value: 'Roboto'},
          fontWeight: {value: 500},
          fontSize: {value: '14px'},
          lineHeight: {value: '16px'},
        },
        button: {
          lineHeight: {value: '{typography.base.lineHeight}'},
          fontSize: {value: '{typography.base.fontSize}'},
          fontWeight: {value: '{typography.base.lineHeight}'},
          textTransform: {value: 'uppercase'},
        }
      }
    })
  });
});
