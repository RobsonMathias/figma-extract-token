import { Color } from '../interfaces'

export function calcRGB(value: number) {
  return Math.round(value * 255)
}

export function colorToRGB(color: Color): string | undefined {
  if (!color) return undefined
  const a = color.a < 1 && color.a > 0 ? color.a.toFixed(2) : color.a
  return `rgba(${calcRGB(color.r)}, ${calcRGB(color.g)}, ${calcRGB(
    color.b,
  )}, ${a})`
}

function calcHex(c: number) {
  let hex = c.toString(16)
  hex = hex.length == 1 ? '0' + hex : hex
  return hex.toUpperCase()
}

export function colorToHEX(color: Color, alfa?: boolean): string | undefined {
  if (!color) return undefined
  const r = calcRGB(color.r)
  const g = calcRGB(color.g)
  const b = calcRGB(color.b)
  const a = calcRGB(color.a)
  return `#${calcHex(r)}${calcHex(g)}${calcHex(b)}${alfa ? calcHex(a) : ''}`
}
