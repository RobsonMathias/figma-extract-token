import { requiredArgs } from '../required-args'

describe('requiredArgs', () => {
  it('should has been missing one required arg', () => {
    const spy = spyOn(console, 'error').and.callThrough()
    const givenArgs = { document: '234' }
    const givenRequired = ['token']
    const when = requiredArgs(givenRequired, givenArgs)
    when[0].log()
    expect(when[0].error.message).toEqual(
      'Missing argument: "token" is required',
    )
    expect(spy).toHaveBeenCalledWith('Missing argument: "token" is required')
  })

  it('should has been missing none required arg', () => {
    const givenArgs = { document: '234' }
    const givenRequired = ['document']
    const when = requiredArgs(givenRequired, givenArgs)
    expect(when).toEqual([])
  })
})
