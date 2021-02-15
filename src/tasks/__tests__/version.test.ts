import {when} from 'jest-when';
import {InitializerFactory} from '../../factories';

const loadConfig = jest.fn();
const loadMultipleConfig = jest.fn();
const composeArgs = jest.fn();
jest.mock('../../helpers', () => ({composeArgs}));
jest.mock('../../services', () => ({loadConfig, loadMultipleConfig}));
jest.mock('../../factories');

import {versioning} from '../versioning';

describe('version', () => {
  // it('should call version successfully', async () => {
  //   when(loadConfig).calledWith(expect.anything()).mockReturnValue({mocked: true});
  //   when(loadMultipleConfig).calledWith(expect.anything(), /.tokens.json/g).mockResolvedValue({mocked: true});
  //
  //   const result = await versioning.task({factory});
  //
  //   expect(loadConfig).toHaveBeenCalledWith('file.json');
  //   expect(result).toEqual({ mocked: true });
  // });

  it('should skip version successfully', async () => {
    const args = {versioning: true};
    when(composeArgs).calledWith(expect.anything()).mockReturnValue(args);
    const result = await versioning.skip();
    expect(result).toBeFalsy();
  });

  it('should NOT skip version successfully', async () => {
    const args = {};
    when(composeArgs).calledWith(expect.anything()).mockReturnValue(args);
    const result = await versioning.skip();
    expect(result).toBeTruthy();
  });
});
