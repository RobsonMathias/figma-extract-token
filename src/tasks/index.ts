import {fetchApiTask} from './fetch-api';
import {loadConfigTask} from './load-config';
import {composeTheme} from './compose-theme';
import {composeComponents} from './compose-components';
import * as Listr from 'listr';

export const tasks = new Listr([
  fetchApiTask,
  loadConfigTask,
  composeTheme,
  composeComponents,
]);

