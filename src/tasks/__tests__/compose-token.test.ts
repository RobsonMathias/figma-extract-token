import {InitializerFactory} from '../../factories';
const generateToken = jest.fn();
jest.mock('../../factories');
jest.mock('../../services', () => ({generateToken}));

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
    expect(generateToken).toHaveBeenCalledWith('DIR', {mocked: true}, '_foundation');
    expect(generateToken).toHaveBeenCalledWith('DIR', {mocked: true}, 'components');
  });
});
