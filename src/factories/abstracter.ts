import {InitializerFactory} from './initializer';
import {Child, Dictionary, Node} from '../interfaces';
import {Style} from '../services';

export abstract class Abstracter<C> {
  public main: InitializerFactory;
  public name: string = '';
  public node: Node|undefined;
  public child: Child|undefined;
  public children: Array<C> = [];

  protected constructor(main: InitializerFactory) {
    this.main = main;
  }

  static hasBaseExtraction(name: string): boolean {
    return name === '__base__';
  }

  static isAGroup(node: Node): boolean {
    switch (node.type) {
      case 'CANVAS':
      case 'FRAME':
      case 'GROUP':
        return true;
      default:
        return false;
    }
  }

  static isComponent(node: Node): boolean {
    return node.type === 'FRAME';
  }

  static ignoreElement(name: string): boolean {
    return name.indexOf('!!') === 0;
  }

  fetchNode(name: string, where: Node[] = []): Node|undefined {
    return where.find(node => name === node.name);
  }

  composeChild(nodes: Node[] = [], name: string, child: Child): Node|undefined {
    if (!child) return;
    const node = this.fetchNode(name, nodes);
    if (this.node && Abstracter.isAGroup(this.node)) {
      return node;
    } else {
      console.error(`Node ${this.name} was not found on figma JSON`);
    }
  }

  extractStyle(): Dictionary {
    const extract = this.extractionToObject();
    const styled: Dictionary = {};
    Object.keys(extract).forEach((e: string) => {
      if (Object.keys(extract).length > 1) {
        styled[extract[e] as string] = {
          ['value']: Style.extract(e, this.node!!)
        };
      } else {
        styled['value'] = Style.extract(e, this.node!!);
      }
    });
    return styled;
  }

  private extractionToObject(): Dictionary {
    if (!this.child || !this.child.extract) return {};
    const baseExtraction = Abstracter.hasBaseExtraction(this.name) ? this.child!!.__base__ : this.child!!.extract;
    if (Array.isArray(baseExtraction)) {
      const convert: Dictionary = {};
      baseExtraction.forEach((key: string) => {
        convert[key] = key;
      });
      return convert as Dictionary;
    }
    return baseExtraction as Dictionary;
  }

  abstract compose(): Dictionary

  abstract addChildren(name: string, instance: C): void;

  abstract call(...args: any): void

  abstract get composedName(): string;

}
