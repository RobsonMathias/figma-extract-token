import {fetchApiTask} from './fetch-api';
import {loadConfigTask} from './load-config';
import {composeToken} from './compose-token';
import * as Listr from 'listr';

export const tasks = new Listr([
  fetchApiTask,
  loadConfigTask,
  composeToken,
]);

