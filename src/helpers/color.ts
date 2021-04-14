import { Color } from '../interfaces'

export function calcRGB(value: number) {
  return Math.round(value * 255)
}

export function colorToRGB(
  color: Color,
  opacity: number = 0,
): string | undefined {
  if (!color) return undefined
  const _opacity = opacity || color.a
  //@ts-ignore
  const alpha = _opacity < 1 && _opacity > 0 ? _opacity?.toFixed(2) : _opacity
  return `rgba(${calcRGB(color.r)}, ${calcRGB(color.g)}, ${calcRGB(
    color.b,
  )}, ${alpha})`
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
