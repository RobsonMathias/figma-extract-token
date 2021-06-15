import { InitializerFactory } from './initializer'
import { Child, ChildType, Dictionary, Node } from '../interfaces'
import { Style } from './style'

export abstract class Abstracter<C> extends Style {
  public main: InitializerFactory
  public _name: string = ''
  public node: Node | undefined
  public child: Child | undefined
  public children: Array<C> = []
  public comment: string = ''
  public deprecated = false

  protected constructor(main: InitializerFactory) {
    super()
    this.main = main
  }

  static hasBaseExtraction(name: string): boolean {
    return name === '__base__'
  }

  static isAGroup(node: Node): boolean {
    switch (node.type) {
      case 'COMPONENT':
      case 'COMPONENT_SET':
      case 'CANVAS':
      case 'FRAME':
      case 'GROUP':
        return true
      default:
        return false
    }
  }

  static isComponentGroup(node: Node): boolean {
    return node.type === 'FRAME' || node.type === 'COMPONENT'
  }

  static ignoreElement(name: string): boolean {
    return name.indexOf('!!') === 0
  }

  static composeInheritanceName(name: any) {
    return typeof name === 'string'
      ? name.replace(/(\.value})|(})$/g, '.value}')
      : name
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    if (value.indexOf('@deprecated') > -1) {
      this.deprecated = true
      this._name = value.replace(/@deprecated\s?/g, '')
    } else {
      this._name = value
    }
  }

  isDefault(): boolean {
    return this.name.toLowerCase() === 'default'
  }

  setComment() {
    const component = this.main.json.components[this.node!!.id]
    if (component) {
      this.comment = component.description
    }
  }

  fetchNode(name: string, where: Node[] = []): Node | undefined {
    return where.find(node => name === node.name)
  }

  composeChild(
    nodes: Node[] = [],
    name: string,
    child: Child,
  ): Node | undefined {
    if (!child) return
    const node = this.fetchNode(name, nodes)
    if (this.node && Abstracter.isAGroup(this.node)) {
      return node
    } else {
      console.error(`Node ${this.name} was not found on figma JSON`)
    }
  }

  extractStyle(): Dictionary {
    const extract = this.extractionToObject()
    let styled: Dictionary = {}
    Object.keys(extract).forEach((e: string) => {
      if (Object.keys(extract).length > 1) {
        styled[extract[e] as string] = {
          ['value']: Style.extract(e, this.node!!),
          ...this.setInfo(),
        }
      } else {
        styled = {
          ...styled,
          value: Style.extract(e, this.node!!),
          ...this.setInfo(),
        }
      }
    })
    return styled
  }

  findByValue(value: string, object: any, name: string): string {
    let result = value
    Object.keys(object).forEach((i: string) => {
      if (object[i] === value && i.indexOf(name) >= 0) {
        result = `{${i}}`
      }
    })
    return result
  }

  findChildByValue(name: string, object: any, type?: ChildType): object {
    let current: { [key: string]: any } = {}
    Object.keys(object).forEach(o => {
      const key = o.split('.')
      if (o.indexOf(name) === 0 && o !== name) {
        current[key[key.length - 1] as string] = {
          value: `{${o}.value}`,
          ...this.setInfo(type),
        }
      } else if (o.indexOf(name) === 0) {
        current = {
          value: `{${o}.value}`,
          ...this.setInfo(type),
        }
      }
    })
    if (!Object.keys(current).length) {
      current = {
        value: `{${name}.value}`,
        ...this.setInfo(),
      }
    }
    return current
  }

  setInfo(type = 'foundation'): object {
    const deprecated = this.deprecated ? { deprecated: this.deprecated } : {}
    const comment = this.comment ? { comment: this.comment } : {}
    return {
      ...deprecated,
      ...comment,
      type,
    }
  }

  private extractionToObject(): Dictionary {
    if (!this.child || !this.child.extract) return {}
    const baseExtraction = Abstracter.hasBaseExtraction(this.name)
      ? this.child!!.__base__
      : this.child!!.extract
    if (Array.isArray(baseExtraction)) {
      const convert: Dictionary = {}
      baseExtraction.forEach((key: string) => {
        convert[key] = key
      })
      return convert as Dictionary
    }
    return baseExtraction as Dictionary
  }

  abstract compose(args?: any): Dictionary

  abstract addChildren(name: string, instance: C): void

  abstract call(...args: any): void

  abstract get composedName(): string
}
