import {Compose} from './compose';
import {MainFactory} from './main';
import {Child, Dictionary, Node} from '../interfaces';

export class ComponentFactory extends Compose<ComponentFactory> {
  public children: Array<ComponentFactory> = [];

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

  addChildren(name: string, instance: ComponentFactory) {
    if (!ComponentFactory.ignoreElement(name))
      this.children.push(instance);
  }

  call(): void {
    if (ComponentFactory.isAGroup(this.node as Node)) {
      (this.node?.children || []).forEach(n => {
        const instance = new ComponentFactory(name, this.child!!, n, this.main);
        this.addChildren(n.name, instance);
      });
    }
  }
}
