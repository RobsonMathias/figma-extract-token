import {fetchApiTask} from './fetch-api';
import {loadConfigTask} from './load-config';
import {composeToken} from './compose-token';
import {runDictionary} from './run-dictionary';
import * as Listr from 'listr';

export const tasks = new Listr([
  fetchApiTask,
  loadConfigTask,
  composeToken,
  runDictionary
]);

