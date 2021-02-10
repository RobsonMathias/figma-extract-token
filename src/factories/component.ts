import {Abstracter} from './abstracter';
import {InitializerFactory} from './initializer';
import {Child, Dictionary, Node} from '../interfaces';
import {Style} from '../services';

export class ComponentFactory extends Abstracter<ComponentFactory> {
  public children: Array<ComponentFactory> = [];

  constructor(name: string, child: Child, node: Node, main: InitializerFactory) {
    super(main);
    this.name = name;
    this.node = node;
    this.child = child;
    this.call();
  }

  get composedName(): string {
    const name = `${this.name.charAt(0).toLowerCase()}${this.name.slice(1)}`;
    return name.replace(/( \/ )+|(__)/g, '');
  }

  private extractStyleFromComponent(): {[key: string]: any} {
    return ComponentFactory.isComponent(this.node!!) && this.name.indexOf('/') > -1 ?
      Style.extractFromComponent(this.node!!, this.child!!, this.main.foundation.compose()) : {};
  }

  compose(): Dictionary {
    const result: Dictionary = {
      [this.composedName]: {}
    };

    const style = this.extractStyleFromComponent();

    if (this.children.length) {
      this.children.forEach(c => {
        const root = result[this.composedName];
        // @ts-ignore
        result[this.composedName] = {...root, ...c.compose()};

      });
    } else {
      result[this.composedName] = {...this.extractStyle(), ...style};
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
        const instance = new ComponentFactory(n.name, this.child!!, n, this.main);
        this.addChildren(n.name, instance);
      });
    }
  }
}
