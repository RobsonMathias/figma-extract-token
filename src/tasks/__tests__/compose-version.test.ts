import { when } from 'jest-when'

const generateJson = jest.fn()
jest.mock('../../services', () => ({ generateJson }))

import { composeVersion } from '../compose-version'

const compose = jest.fn()
const factory = {
  version: {
    compose,
  },
  config: { outDir: 'DIR' },
} as any

describe('composeVersion', () => {
  it('should compose version successfully', async () => {
    await composeVersion.task({ factory })
    expect(composeVersion.title).toEqual('Composing version')
    expect(compose).toHaveBeenCalled()
    expect(generateJson).toHaveBeenCalledWith('DIR', undefined, 'VERSION')
  })
})
