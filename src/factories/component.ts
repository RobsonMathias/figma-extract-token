import {Abstracter} from './abstracter';
import {Child, Dictionary, Node} from '../interfaces';
import {InitializerFactory} from './initializer';

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

  compose(foundation: any): Dictionary {
    const result: Dictionary = {
      [this.composedName]: {}
    };
    const style = this.extractStyleFromComponent(foundation);
    if (this.children.length) {
      this.children.forEach(c => {
        const root = result[this.composedName];
        // @ts-ignore
        result[this.composedName] = {...root, ...c.compose(foundation), ...style};
      });
    } else {
      result[this.composedName] = {...this.extractStyle(), ...style};
    }

    return this.inheritanceComponent(result, foundation);
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

  private extractStyleFromComponent(foundation: any): {[key: string]: any} {
    return ComponentFactory.isComponent(this.node!!) && this.name.indexOf('/') > -1 ?
      ComponentFactory.extractFromComponent(
        this.node!!,
        foundation,
        this.main.config.components.inheritance
      ) : {};
  }

  private inheritanceComponent(item: Dictionary, foundation: any): Dictionary {
    const mapped = ComponentFactory.mapFoundation(foundation);
    Object.keys(item).forEach((e: string) => this.componentForEach(item[e], mapped));
    return item;
  }

  private static composeInheritanceName(name: string) {
    return name.replace(/(\.value})|(})$/g, '.value}');
  }

  private componentForEach(item: any, foundation: any) {
    Object.keys(item).forEach((key: string) => {
      const current = item[key];
      if (current.value) {
        current.value =  ComponentFactory.composeInheritanceName(this.findByValue(current.value, foundation));
      } else if (Object.keys(current).length === 0) {
        item[ComponentFactory.formatName(key)] = {
          value: `{${key}.value}`
        };
        delete item[key];
      } else {
        this.componentForEach(current, foundation);
      }
    });
  }
}
