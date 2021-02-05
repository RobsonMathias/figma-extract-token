import {when} from 'jest-when';

const loadConfig = jest.fn();
const composeArgs = jest.fn();
const requiredArgs = jest.fn();
const error = new Error('mocked');
jest.mock('../../helpers', () => ({composeArgs, requiredArgs}));
jest.mock('../../services', () => ({loadConfig}));

import {loadConfigTask} from '../compose-components';

describe('composeComponents', () => {
  it('should compose args successfully', async () => {
    const args = {config: 'file.json'};
    when(loadConfig).calledWith('file.json').mockReturnValue({mocked: true});
    when(composeArgs).calledWith(expect.anything()).mockReturnValue(args);
    when(requiredArgs).calledWith(['config'], args).mockReturnValue([]);

    const result = await loadConfigTask.task();

    expect(loadConfigTask.title).toEqual('Loading configurations');
    expect(loadConfig).toHaveBeenCalledWith('file.json');
    expect(result).toEqual({ mocked: true });
  });

  it('should NOT fetch json when config arg is missing', () => {
    const args = {example: 'EXAMPLE'};
    const log = jest.fn();
    when(composeArgs).calledWith(expect.anything()).mockReturnValue(args);
    when(requiredArgs).calledWith(['config'], args).mockReturnValue([{log, error}]);
    expect(loadConfigTask.task()).rejects.toHaveLength(1);
    expect(log).toHaveBeenCalledTimes(1);
  });

});
