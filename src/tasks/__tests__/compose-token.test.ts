import {InitializerFactory} from '../../factories';
const generateToken = jest.fn();
jest.mock('../../factories');
jest.mock('../../services', () => ({generateToken}));

import {composeToken} from '../compose-token';

const factory = new InitializerFactory();

describe('composeFoundation', () => {
  it('should compose foundation successfully', async () => {
    const spyCompose = spyOn(factory, 'compose').and.returnValue({mocked: true});
    factory.config = {outDir: 'DIR'} as any;
    const result = await composeToken.task({factory});
    expect(composeToken.title).toEqual('Composing tokens');
    expect(spyCompose).toHaveBeenCalled();
    expect(result).toEqual({mocked: true});
    expect(generateToken).toHaveBeenCalledWith('DIR', {mocked: true});
  });
});
