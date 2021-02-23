import { fetchApiTask } from './fetch-api'
import { loadConfigTask } from './load-config'
import { composeToken } from './compose-token'
import { composeChangelog } from './compose-changelog'
import { runDictionary } from './run-dictionary'
import { versioning } from './versioning'
import { composeVersion } from './compose-version'
import * as Listr from 'listr'

export const tasks = new Listr([
  fetchApiTask,
  loadConfigTask,
  versioning,
  composeToken,
  composeChangelog,
  runDictionary,
  composeVersion,
])
