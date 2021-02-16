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
        result[this.composedName] = {...root, ...c.compose(foundation), ...style};
      });
    } else {
      result[this.composedName] = {
        ...this.extractStyle(),
        ...style,
      };
    }
    return this.inheritanceComponent(result, foundation);
  }

  addChildren(name: string, instance: ComponentFactory) {
    if (!ComponentFactory.ignoreElement(name))
      this.children.push(instance);
  }

  call(): void {
    this.setComment();
    if (ComponentFactory.isAGroup(this.node as Node)) {
      (this.node?.children || []).forEach(n => {
        const instance = new ComponentFactory(n.name, this.child!!, n, this.main);
        this.addChildren(n.name, instance);
        this.inheritanceInfo();
      });
    }
  }

  private inheritanceInfo() {
    const instance = this.children[this.children.length - 1] || this;
    if (this.comment) instance.comment = this.comment;
    if (this.deprecated) instance.deprecated = this.deprecated;
  }

  private extractStyleFromComponent(foundation: any): {[key: string]: any} {
    if (ComponentFactory.isComponent(this.node!!) && this.name.indexOf('.') === -1) {
      const extracted = ComponentFactory.extractFromComponent(
        this.node!!,
        foundation,
        this.main.config.components.inheritance
      );
      Object.keys(extracted).forEach(k => {
        extracted[k] = {
          ...extracted[k],
          ...this.setInfo('components'),
        }
      });
      return extracted;
    } else {
      return {};
    }
  }

  private inheritanceComponent(item: Dictionary, foundation: any): Dictionary {
    const mapped = ComponentFactory.mapFoundation(foundation);
    Object.keys(item).forEach((e: string) => this.componentForEach(item[e], mapped));
    return item;
  }

  private componentForEach(item: any, foundation: any) {
    Object.keys(item).forEach((key: string) => {
      const current = item[key];
      if (current.value) {
        const value = this.findByValue(current.value, foundation, key);
        if (value.indexOf('{') === 0) {
          current.value =  ComponentFactory.composeInheritanceName(value);
        } else {
          delete item[key];
        }
      } else if (Object.keys(current).length === 0) {
        item[ComponentFactory.formatName(key)] = this.findChildByValue(key, foundation, 'components');
        delete item[key];
      } else if(Object.keys(current).length > 1) {
        this.componentForEach(current, foundation);
      }
    });
  }

}
