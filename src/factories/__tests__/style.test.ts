import { Paint, Effect } from '../../interfaces'
import { Style } from '../style'

describe('Style', () => {
  it('should convert fills to style', () => {
    const given: Paint[] = [
      {
        blendMode: 'NORMAL',
        type: 'SOLID',
        color: { r: 0.3843137323856354, g: 0, b: 0.9333333373069763, a: 1 },
      },
    ]
    const when = Style.fills(given)
    expect(when).toEqual('rgba(98, 0, 238, 1)')
  })

  it('should convert value by unit', () => {
    const when = Style.valueByUnit('12', 'PIXELS')
    expect(when).toEqual('12px')
  })

  describe('drop shadow', () => {
    it('shoulds convert drop shadow to style', () => {
      const given: Effect[] = [
        {
          type: 'DROP_SHADOW',
          visible: true,
          color: {
            r: 0.0,
            g: 0.0,
            b: 0.0,
            a: 0.15999999642372131,
          },
          blendMode: 'NORMAL',
          offset: {
            x: 0.0,
            y: 16.0,
          },
          radius: 12.0,
          spread: -8.0,
        },
        {
          type: 'DROP_SHADOW',
          visible: true,
          color: {
            r: 0.0,
            g: 0.0,
            b: 0.0,
            a: 0.11999999731779099,
          },
          blendMode: 'NORMAL',
          offset: {
            x: 0.0,
            y: 16.0,
          },
          radius: 8.0,
          spread: -12.0,
        },
      ]

      const when = Style.effectShadow(given)

      expect(when).toEqual(
        '0px 16px 12px -8px rgba(0, 0, 0, 0.16), 0px 16px 8px -12px rgba(0, 0, 0, 0.12)',
      )
    })

    it('shoulds convert one drop shadow to style', () => {
      const given: Effect[] = [
        {
          type: 'DROP_SHADOW',
          visible: true,
          color: {
            r: 0.0,
            g: 0.0,
            b: 0.0,
            a: 0.15999999642372131,
          },
          blendMode: 'NORMAL',
          offset: {
            x: 0.0,
            y: 16.0,
          },
          radius: 12.0,
          spread: -8.0,
        },
      ]

      const when = Style.effectShadow(given)

      expect(when).toEqual('0px 16px 12px -8px rgba(0, 0, 0, 0.16)')
    })

    it('shoulds convert drop shadow to style without spread', () => {
      const given: Effect[] = [
        {
          type: 'DROP_SHADOW',
          visible: true,
          color: {
            r: 0.0,
            g: 0.0,
            b: 0.0,
            a: 0.15999999642372131,
          },
          blendMode: 'NORMAL',
          offset: {
            x: 0.0,
            y: 16.0,
          },
          radius: 12.0,
        },
      ]

      const when = Style.effectShadow(given)

      expect(when).toEqual('0px 16px 12px rgba(0, 0, 0, 0.16)')
    })
  })
})
