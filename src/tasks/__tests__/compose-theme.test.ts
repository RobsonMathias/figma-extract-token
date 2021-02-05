import {composeTheme} from '../compose-theme';

describe('composeTheme', () => {
  it('should compose theme successfully', async () => {
    const result = await composeTheme.task();
    expect(composeTheme.title).toEqual('Composing theme tokens');
    expect(result).toEqual({ mocked: true });
  });
});
