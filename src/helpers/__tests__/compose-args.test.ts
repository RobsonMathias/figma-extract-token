import { composeArgs } from '../compose-args'

describe('composeArgs', () => {
  it('should compose args successfully', () => {
    const argsGiven = ['--token=123', '--document=456', 'ERROR']
    const envGiven = {}
    const when = composeArgs(argsGiven, envGiven)
    expect(when).toEqual({ token: '123', document: '456' })
  })

  it('should NOT compose args', () => {
    const argsGiven = ['token=123', '456', 'ERROR']
    const envGiven = {}
    const when = composeArgs(argsGiven, envGiven)
    expect(when).toEqual({})
  })

  it('should compose env', () => {
    const argsGiven: any[] = []
    const envGiven = {token: '456'}
    const when = composeArgs(argsGiven, envGiven)
    expect(when).toEqual({
      token: '456'
    })
  })

  it('should compose args with env equal values', () => {
    const argsGiven = ['--token=123', '456', 'ERROR']
    const envGiven = {token: '456'}
    const when = composeArgs(argsGiven, envGiven)
    expect(when).toEqual({
      token: '456'
    })
  })
})
