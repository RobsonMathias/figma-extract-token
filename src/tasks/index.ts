import {fetchApiTask} from './fetch-api';
import {loadConfigTask} from './load-config';
import {composeFoundation} from './compose-foundation';
import {composeComponents} from './compose-components';
import * as Listr from 'listr';

export const tasks = new Listr([
  fetchApiTask,
  loadConfigTask,
  composeFoundation,
  composeComponents,
]);

