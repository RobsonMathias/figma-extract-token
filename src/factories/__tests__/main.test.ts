import {MainFactory} from '../main';
import {CONFIG_MOCK_DEFAULT, FIGMA_MOCK_DEFAULT} from '../../__mock__';
import {Config} from '../../interfaces';
import {ParentFactory} from '../parent';

describe('MainFactory', () => {
  it('should create successfully', () => {
    const factory = new MainFactory();
    factory.config = CONFIG_MOCK_DEFAULT as Config;
    factory.json = FIGMA_MOCK_DEFAULT as any;
    expect(factory.theme).toBeInstanceOf(ParentFactory);
    expect(factory.components).toBeInstanceOf(ParentFactory);
  });
});
