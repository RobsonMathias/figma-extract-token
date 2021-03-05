import { Color, Gradient, Offset, Paint } from '../interfaces'
import { colorToHEX, colorToRGB } from './color'

function color(c: Color) {
  return c.a === 1 ? colorToHEX(c) : colorToRGB(c)
}

function pointDirection(a: Offset, b: Offset) {
  return parseFloat(
    ((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI).toFixed(2),
  )
}

function calcDeg(a?: Offset, b?: Offset): string {
  if (!a || !b) return '0deg'
  return `${pointDirection(a, b)}deg`
}

function percentageCalc(value: number) {
  return `${parseFloat((value * 100).toFixed(2))}%`
}

function calcOrigin(a?: Offset): string {
  if (!a) return '0% 0%'
  return `${percentageCalc(a.x)} ${percentageCalc(a.y)}`
}

function calcPercentageColor(colors?: Gradient[]): string {
  if (!colors) return ''
  return colors
    .map(c => `${color(c.color)} ${percentageCalc(c.position)}`)
    .join(', ')
}

function calcDegColor(value?: Gradient[]): string {
  if (!value) return ''
  const colors = [...value, ...value]
  return colors
    .map((c: Gradient, index: number) => {
      let calc = Math.round(c.position * 360 * 100) / 100
      if (index === 0) {
        calc = parseFloat((calc + 360).toFixed(2))
      } else if (index === colors.length - 1) {
        calc = parseFloat((calc - 360).toFixed(2))
      }
      return `${color(c.color)} ${calc}deg`
    })
    .reverse()
    .join(', ')
}

export function calcLinear(paint: Paint) {
  return `${calcDeg(
    paint.gradientHandlePositions!![0],
    paint.gradientHandlePositions!![2],
  )}, ${calcPercentageColor(paint.gradientStops)}`
}

export function calcAngular(paint: Paint) {
  return `from ${calcDeg(
    paint.gradientHandlePositions!![0],
    paint.gradientHandlePositions!![2],
  )} at ${calcOrigin(paint.gradientHandlePositions!![0])}, ${calcDegColor(
    paint.gradientStops,
  )}`
}

export function calcDiamond(paint: Paint) {
  const [ref1, ref2, ref3] = paint.gradientHandlePositions!!
  return `${percentageCalc(ref1.x - ref3.x)} ${percentageCalc(
    ref2.y - ref1.y,
  )} at ${percentageCalc(ref1.x)} ${percentageCalc(
    ref1.y,
  )}, ${calcPercentageColor(paint.gradientStops)}`
}

export function calcRadial(paint: Paint) {
  const [ref1, , ref3] = paint.gradientHandlePositions!!
  return `${percentageCalc(ref1.x - ref3.x)} ${percentageCalc(
    ref1.y - ref3.y,
  )} at ${percentageCalc(ref1.x)} ${percentageCalc(
    ref1.y,
  )}, ${calcPercentageColor(paint.gradientStops)}`
}
