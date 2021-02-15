import {InitializerFactory} from '../../factories';
const generateJson = jest.fn();
jest.mock('../../factories');
jest.mock('../../services', () => ({generateJson}));

import {composeToken} from '../compose-token';

const factory = new InitializerFactory();

describe('composeFoundation', () => {
  it('should compose foundation successfully', async () => {
    const foundation = {mocked: true},
          components = {mocked: true};
    const spyCompose = spyOn(factory, 'compose').and.returnValue({foundation, components});
    factory.config = {outDir: 'DIR'} as any;
    const result = await composeToken.task({factory});
    expect(composeToken.title).toEqual('Composing tokens');
    expect(spyCompose).toHaveBeenCalled();
    expect(result).toEqual({foundation, components});
    expect(generateJson).toHaveBeenCalledWith('DIR', {mocked: true}, '_foundation.tokens');
    expect(generateJson).toHaveBeenCalledWith('DIR', {mocked: true}, 'components.tokens');
  });
});
