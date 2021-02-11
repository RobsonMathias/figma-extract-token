import {when} from 'jest-when';
import {InitializerFactory} from '../../factories';

const fetchApi = jest.fn();
const composeArgs = jest.fn();
const requiredArgs = jest.fn();
const error = new Error('mocked');
jest.mock('../../helpers', () => ({requiredArgs, composeArgs}));
jest.mock('../../services', () => ({fetchApi}));
jest.mock('../../factories');

import {fetchApiTask} from '../fetch-api';
const factory = new InitializerFactory();

describe('fetchApiTask', () => {
  it('should compose args successfully', async () => {
    const args = {token: 'TOKEN', document: 'DOCUMENT'};
    when(fetchApi).calledWith('TOKEN', 'DOCUMENT').mockReturnValue({mocked: true});
    when(composeArgs).calledWith(expect.anything()).mockReturnValue(args);
    when(requiredArgs).calledWith(['token', 'document'], args).mockReturnValue([]);

    const result = await fetchApiTask.task({factory});

    expect(fetchApiTask.title).toEqual('Fetching Figma API JSON');
    expect(fetchApi).toHaveBeenCalledWith('TOKEN', 'DOCUMENT');
    expect(result).toEqual({ mocked: true });
  });

  it('should NOT fetch json when token args is missing', () => {
    const args = {document: 'DOCUMENT'};
    const log = jest.fn();
    when(composeArgs).calledWith(expect.anything()).mockReturnValue(args);
    when(requiredArgs).calledWith(['token', 'document'], args).mockReturnValue([{log, error}]);
    expect(fetchApiTask.task({factory: factory as any})).rejects.toHaveLength(1);
    expect(log).toHaveBeenCalledTimes(1);
  });

  it('should NOT fetch json when document args is missing', () => {
    const args = {token: 'TOKEN'};
    const log = jest.fn();
    when(composeArgs).calledWith(expect.anything()).mockReturnValue(args);
    when(requiredArgs).calledWith(['token', 'document'], args).mockReturnValue([{log, error}]);
    expect(fetchApiTask.task({factory})).rejects.toHaveLength(1);
    expect(log).toHaveBeenCalledTimes(1);
  });
});
