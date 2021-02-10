import {Abstracter} from './abstracter';
import {InitializerFactory} from './initializer';
import {Child, Dictionary, Node} from '../interfaces';

export class FoundationFactory extends Abstracter<FoundationFactory> {
  public children: Array<FoundationFactory> = [];

  constructor(name: string, child: Child, node: Node, main: InitializerFactory) {
    super(main);
    this.name = name;
    this.node = node;
    this.child = child;
    if (!FoundationFactory.ignoreElement(name)) {
      this.call();
    }
  }

  get composedName(): string {
    return this.name.toLowerCase()
      .replace(/(.*\.)|(__)/g, '');
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

  addChildren(name: string, instance: FoundationFactory) {
    if (!FoundationFactory.ignoreElement(name)) {
      this.children.push(instance);
    }
  }

  call(): void {
    if (FoundationFactory.isAGroup(this.node as Node)) {
      (this.node?.children || []).forEach(n => {
        //@ts-ignore
        const child = this.child.children ? this.child.children[n.name] : this.child!!;
        const instance = new FoundationFactory(n.name, child, n, this.main);
        this.addChildren(n.name, instance);
      });
    }
  }
}
