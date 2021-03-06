import { Effect, Node, Paint } from '../interfaces'
import {
  calcAngular,
  calcDiamond,
  calcLinear,
  calcRadial,
  camelcase,
  colorToRGB,
} from '../helpers'

export class Style {
  static isComponent(node: Node): boolean {
    return (
      node.type !== 'FRAME' && node.type !== 'GROUP' && node.type !== 'CANVAS'
    )
  }

  static isIcon(node: Node): boolean {
    return node!!.name.toLowerCase() === 'icon' && node!!.type !== 'CANVAS'
  }

  private static getUnit(key: string): string {
    const data: { [key: string]: string } = {
      PIXELS: 'px',
      PERCENTAGE: '%',
    }
    return data[key] || key
  }

  static fills(
    colors: Paint[] = [],
    preserveRatio?: boolean,
  ): string | undefined {
    const [paint] = colors
    if (!paint) return undefined
    switch (paint.type) {
      case 'GRADIENT_LINEAR':
      case 'GRADIENT_RADIAL':
      case 'GRADIENT_ANGULAR':
      case 'GRADIENT_DIAMOND':
        return this.gradientColor(paint, preserveRatio)
      default:
        return colorToRGB(paint.color!!, paint.opacity)
    }
  }

  static gradientColor(
    paint: Paint,
    preserveRatio?: boolean,
  ): string | undefined {
    if (!paint) return undefined
    switch (paint.type) {
      case 'GRADIENT_LINEAR':
        return `linear-gradient(${calcLinear(paint)})`
      case 'GRADIENT_RADIAL':
        return `radial-gradient(${calcRadial(paint, preserveRatio)})`
      case 'GRADIENT_ANGULAR':
        return `conic-gradient(${calcAngular(paint)})`
      case 'GRADIENT_DIAMOND':
        return `radial-gradient(${calcDiamond(paint)})`
      default:
        return undefined
    }
  }

  static valueByUnit(value: string | number, unit: string): string {
    return value !== undefined ? `${value}${this.getUnit(unit)}` : ''
  }

  static lineHeight(value: { [key: string]: string }) {
    if (value.lineHeightUnit === 'FONT_SIZE_%') {
      return this.valueByUnit(value.lineHeightPercentFontSize, 'PERCENTAGE')
    } else {
      return this.valueByUnit(value.lineHeightPx, value.lineHeightUnit)
    }
  }

  static textTransform(value: string) {
    const data: { [key: string]: string } = {
      UPPER: 'uppercase',
    }
    return data[value] || value
  }

  static toFixed(value: number, fraction: number = 3): string {
    return value ? value.toFixed(fraction).toString() : `${value}`
  }

  static effectShadow(effects: Effect[] = []): string {
    if (!effects || !effects.length) return ''

    return effects
      .map(effect => {
        const x = this.valueByUnit(effect.offset.x, 'PIXELS')
        const y = this.valueByUnit(effect.offset.y, 'PIXELS')
        const radius = this.valueByUnit(effect.radius, 'PIXELS')

        if (effect.spread) {
          const spread = this.valueByUnit(effect.spread, 'PIXELS')
          return `${x} ${y} ${radius} ${spread} ${colorToRGB(effect.color)}`
        }

        return `${x} ${y} ${radius} ${colorToRGB(effect.color)}`
      })
      .join(', ')
  }

  static radiusValue(node: Node): string {
    if (node.rectangleCornerRadii) {
      const radius =
        new Set(node.rectangleCornerRadii).size > 1
          ? node.rectangleCornerRadii
          : [node.rectangleCornerRadii[0]]
      return radius
        .map(r => this.valueByUnit(r, 'PIXELS'))
        .join(' ')
        .trim()
    } else {
      return [node.cornerRadius]
        .map(r => this.valueByUnit(r, 'PIXELS'))
        .join(' ')
        .trim()
    }
  }

  static justifyContent(value: string): string {
    return value ? value.replace(/_/gm, '-').toLowerCase() : ''
  }

  static extract(attribute: string, node: Node): string | undefined {
    const style = node.style || {}
    switch (attribute) {
      case 'fills':
      case 'background':
        return this.fills(node[attribute], node.preserveRatio)
      case 'lineHeightPx':
        return this.lineHeight(style)
      case 'letterSpacing':
        return this.toFixed(style[attribute] as any, 1)
      case 'fontSize':
        return this.valueByUnit(style[attribute], 'PIXELS')
      case 'fontFamily':
      case 'fontWeight':
        return style[attribute]
      case 'textCase':
        return this.textTransform(style[attribute])
      case 'cornerRadius':
        return this.radiusValue(node)
      case 'primaryAxisAlignItems':
        return this.justifyContent(node[attribute])
      case 'itemSpacing':
      case 'paddingRight':
      case 'paddingTop':
      case 'paddingBottom':
      case 'paddingLeft':
      case 'strokeWeight':
        return this.valueByUnit(node[attribute], 'PIXELS')
      case 'width':
        return this.valueByUnit(node.absoluteBoundingBox[attribute], 'PIXELS')
      case 'opacity':
        return node[attribute].toFixed(3).toString()
      case 'dropShadow':
        return this.effectShadow(node.effects)
      case 'characters':
        return node[attribute]
      default:
        return attribute
    }
  }

  static mapFoundation(foundation: any): { [key: string]: string | number } {
    const map: { [key: string]: string | number } = {}
    function extract(name: string, _foundation: any) {
      Object.keys(_foundation).forEach((i: string) => {
        if (i === 'value') {
          map[name] = _foundation[i]
        } else if (typeof _foundation[i] === 'object') {
          const newName = `${name}.${i}`
          extract(newName, _foundation[i])
        }
      })
    }
    Object.keys(foundation).forEach(f => extract(f, foundation[f]))
    return map
  }

  static extractFromComponent(
    node: Node,
    inheritance: any,
  ): { [key: string]: object } {
    const attributes = Object.keys(inheritance)
    let result: { [key: string]: any } = {}
    attributes.forEach(a => {
      if (a !== 'icon') {
        const value = this.extract(a, node)
        if (value && value !== 'undefined') {
          let name = this.getInheritanceName(a, inheritance) || a
          result[name] = { value }
        }
      }
    })
    if (this.isIcon(node)) {
      const name =
        this.getInheritanceName('fontSize', inheritance) || 'fontSize'
      result[name] = {
        value: this.extract('width', node),
      }
    }
    return result
  }

  private static getInheritanceName(alias: string, inheritance: any): string {
    return typeof inheritance[alias] === 'object'
      ? inheritance[alias].convert
      : inheritance[alias]
  }

  static inheritanceHasForceProperty(name: string, inheritance: any): boolean {
    let found = false
    Object.keys(inheritance).forEach(key => {
      const matchValue =
        typeof inheritance[key] === 'object'
          ? inheritance[key].convert
          : inheritance[key]
      if (name === matchValue) found = inheritance[key].force
    })

    return found
  }

  static formatName(value: string): string {
    const [category, type = '', _val] = value.match(/\w+/g) || [value]
    return _val ? camelcase(`${category} ${type}`) : category
  }
}
