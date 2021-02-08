import {Compose} from './compose';
import {MainFactory} from './main';
import {Child, Dictionary, Node} from '../interfaces';

export class ChildFactory extends Compose<ChildFactory> {
  public children: Array<ChildFactory> = [];

  constructor(name: string, child: Child, node: Node, main: MainFactory) {
    super(main);
    this.name = name;
    this.node = node;
    this.child = child;
    this.call();
  }

  compose(): Dictionary {
    const result: Dictionary = {
      [this.composedName]: {}
    };
    if (this.children.length) {
      this.children.forEach(c => {
        const root = result[this.composedName];
        // @ts-ignore
        result[this.composedName] = {...root, ...c.compose()};
      });
    } else {
      result[this.composedName] = {...this.extractStyle()};
    }
    return result;
  }

  addChildren(name: string, child: Child, node: Node|undefined) {
    if (!ChildFactory.ignoreElement(name))
      this.children.push(new ChildFactory(name, child, node!!, this.main));
  }

  call(): void {
    if (ChildFactory.isAGroup(this.node as Node)) {
      (this.node?.children || []).forEach(n => {
        this.addChildren(n.name, this.child!!, n);
      });
    }
  }
}
