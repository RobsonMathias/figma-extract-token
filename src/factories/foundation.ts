import { Abstracter } from './abstracter'
import { InitializerFactory } from './initializer'
import { Child, Dictionary, Node } from '../interfaces'
import { camelcase } from '../helpers'

export class FoundationFactory extends Abstracter<FoundationFactory> {
  public children: Array<FoundationFactory> = []

  constructor(
    name: string,
    child: Child,
    node: Node,
    main: InitializerFactory,
  ) {
    super(main)
    this.name = name
    this.node = node
    this.child = child
    if (!FoundationFactory.ignoreElement(name)) {
      this.call()
    }
  }

  get composedName(): string {
    return this.name.length === 1
      ? this.name
      : camelcase(this.name.toLowerCase().replace(/(.*\.)|(__)/g, ''))
  }

  compose(): Dictionary {
    const result: Dictionary = {
      [this.composedName]: {},
    }
    if (this.children.length) {
      this.children.forEach(c => {
        const root = result[this.composedName]
        // @ts-ignore
        result[this.composedName] = { ...root, ...c.compose() }
      })
    } else {
      result[this.composedName] = {
        ...this.extractStyle(),
      }
    }
    return this.inheritanceFoundation(result)
  }

  addChildren(name: string, instance: FoundationFactory) {
    if (!FoundationFactory.ignoreElement(name)) {
      this.children.push(instance)
    }
  }

  call(): void {
    this.setComment()
    if (FoundationFactory.isAGroup(this.node as Node)) {
      ;(this.node?.children || []).forEach(n => {
        //@ts-ignore
        const child = this.child.children
          ? this.child.children[n.name]
          : this.child!!
        const instance = new FoundationFactory(n.name, child, n, this.main)
        this.addChildren(n.name, instance)
      })
    }
  }

  inheritanceFoundation(item: Dictionary): Dictionary {
    let base: any
    Object.keys(item).forEach(t => {
      if ((item[t] as any).base) {
        base = (item[t] as any).base
        Object.keys(item[t] as any).forEach(p => {
          if (p !== 'base') {
            Object.keys((item[t] as any)[p]).forEach(v => {
              const baseValue = (item as any)[t]['base'][v],
                currentValue = (item as any)[t][p][v]
              if (typeof currentValue === 'object') {
                if (
                  baseValue &&
                  currentValue &&
                  currentValue.value === baseValue.value
                ) {
                  currentValue.value = `{${t}.base.${v}.value}`
                }
              }
            })
          }
        })
      }
    })
    return item
  }
}
