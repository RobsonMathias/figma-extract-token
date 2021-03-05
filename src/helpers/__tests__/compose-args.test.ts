import { composeArgs } from '../compose-args'

describe('composeArgs', () => {
  it('should compose args successfully', () => {
    const given = ['--token=123', '--document=456', 'ERROR']
    const when = composeArgs(given)
    expect(when).toEqual({ token: '123', document: '456' })
  })

  it('should NOT compose args', () => {
    const given = ['token=123', '456', 'ERROR']
    const when = composeArgs(given)
    expect(when).toEqual({})
  })
})
