import { when } from 'jest-when'
import { InitializerFactory } from '../../factories'

const loadConfig = jest.fn()
const loadMultipleConfig = jest.fn()
const composeArgs = jest.fn()
jest.mock('../../helpers', () => ({ composeArgs }))
jest.mock('../../services', () => ({ loadConfig, loadMultipleConfig }))
jest.mock('../../factories')

import { versioning } from '../versioning'

describe('version', () => {
  it('should skip version successfully', async () => {
    const args = { versioning: true }
    when(composeArgs)
      .calledWith(expect.anything(), expect.anything())
      .mockReturnValue(args)
    const result = await versioning.skip()
    expect(result).toBeFalsy()
  })

  it('should NOT skip version successfully', async () => {
    const args = {}
    when(composeArgs)
      .calledWith(expect.anything(), expect.anything())
      .mockReturnValue(args)
    const result = await versioning.skip()
    expect(result).toBeTruthy()
  })
})
