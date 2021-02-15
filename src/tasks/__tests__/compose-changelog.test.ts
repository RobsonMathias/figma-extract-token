const generateJson = jest.fn();
jest.mock('../../services', () => ({generateJson}));

import {composeChangelog} from '../compose-changelog';

const factory = {
  version: {
    json: {mocked: true}
  },
  config: {outDir: 'DIR'}
} as any;

describe('composeChangelog', () => {
  it('should compose log successfully', async () => {
    const result = await composeChangelog.task({factory});
    expect(composeChangelog.title).toEqual('Composing Change Logs');
    expect(result).toEqual({mocked: true});
    expect(generateJson).toHaveBeenCalledWith('DIR', {mocked: true}, 'CHANGELOG');
  });
});
