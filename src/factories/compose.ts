import {MainFactory} from './main';
import {Child, Dictionary, Node} from '../interfaces';
import {Style} from '../services';

export abstract class Compose<C> {
  public main: MainFactory;
  public name: string = '';
  public node: Node|undefined;
  public child: Child|undefined;
  public children: Array<C> = [];

  protected constructor(main: MainFactory) {
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

  static ignoreElement(name: string): boolean {
    return name.indexOf('!!') === 0;
  }

  get composedName(): string {
    return this.name.toLowerCase()
      .replace(/(.*\.)|(__)/g, '');
  }

  fetchNode(name: string, where: Node[] = []): Node|undefined {
    return where.find(node => name === node.name);
  }

  composeChild(nodes: Node[] = [], name: string, child: Child): Node|undefined {
    if (!child) return;
    const node = this.fetchNode(name, nodes);
    if (this.node && Compose.isAGroup(this.node)) {
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
    const baseExtraction = Compose.hasBaseExtraction(this.name) ? this.child!!.__base__ : this.child!!.extract;
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

  abstract addChildren(name: string, child: Child, node: Node|undefined): void;

  abstract call(...args: any): void

}
