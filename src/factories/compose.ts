import {MainFactory} from './main';
import {Child, Children, Dictionary, Node} from '../interfaces';
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

  static hasBaseExtraction(child: Child): boolean {
    return !!child.__base__;
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

  get composedName(): string {
    return this.name.toLowerCase();
  }

  fetchNode(name: string, where: Node[] = []): Node|undefined {
    return where.find(node => name === node.name);
  }

  fetchChild(name: string, where: Children): Child|undefined {
    return where[name];
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
    const extract = this.convertToObject();
    const styled: Dictionary = {};
    Object.keys(extract).forEach((e: string) => {
      styled['value'] = Style.extract(e, this.node!!);
    });
    return styled;
  }

  private extractValue() {

  }

  private convertToObject(): Dictionary {
    if (Array.isArray(this.child!!.extract)) {
      const convert: Dictionary = {};
      this.child!!.extract.forEach((key: string) => {
        convert[key] = key;
      });
      return convert as Dictionary;
    }
    return this.child!!.extract as Dictionary;
  }

  abstract compose(): Dictionary

  abstract addChildren(name: string, child: Child, node: Node|undefined): void;

  abstract call(...args: any): void

}
