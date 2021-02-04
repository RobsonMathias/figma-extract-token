import {fetchApiTask} from './fetch-api';
import {loadConfigTask} from './load-config';
import * as Listr from 'listr';

export const tasks = new Listr([
  fetchApiTask,
  loadConfigTask,
]);

