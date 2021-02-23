import {Abstracter} from './abstracter';
import {Child, Dictionary, Node} from '../interfaces';
import {InitializerFactory} from './initializer';
import {camelcase} from '../helpers';

export class ComponentFactory extends Abstracter<ComponentFactory> {
  public children: Array<ComponentFactory> = [];

  constructor(name: string, child: Child, node: Node, main: InitializerFactory) {
    super(main);
    this.name = name;
    this.node = node;
    this.child = child;
    if (!ComponentFactory.ignoreElement(name)) {
      this.call();
    }
  }

  get composedName(): string {
    const name = `${this.name.charAt(0).toLowerCase()}${this.name.slice(1)}`;
    return name.replace(/( \/ )+|(__)|\s+/g, '');
  }

  compose(foundation: any): Dictionary {
    let result: Dictionary = {
      [this.composedName]: {}
    };
    const style = this.extractStyleFromComponent();
    if (this.children.length) {
      if (this.hasDefaultComposition()) {



        const defaultChild = this.children.find(c => c.name === '__default__');
        const defaultChildComposed = defaultChild!!.compose(foundation);
        result[this.composedName] = {
          ...defaultChildComposed[Object.keys(defaultChildComposed)[0]],
          ...style
        };

        const clone = {...result[this.composedName]};

        const children = this.children.filter(c => c.name !== '__default__');
        children.forEach(c => {
          let composed = c.compose(foundation);
          composed = composed[Object.keys(composed)[0]];

          this.deleteEqualValues(clone, composed);

          const name = camelcase(`${this.composedName} ${c.composedName}`);
          result[name] = {...composed, ...style};
        });



      } else {
        this.children.forEach(c => {
          const root = result[this.composedName];
          result[this.composedName] = {...root, ...c.compose(foundation), ...style};
        });
      }
    } else {
      if (ComponentFactory.isVector(this.node!!)) {
        result = {
          ...result,
          ...this.extractStyle(),
          ...style,
        };
      } else {
        result[this.composedName] = {
          ...this.extractStyle(),
          ...style,
        };
      }
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

  private deleteEqualValues(compare: any, base: any) {
    Object.keys(base).forEach(bKey => {
      const current = base[bKey];
      if (typeof current[Object.keys(current)[0]] === 'object') {
        this.deleteEqualValues(compare[bKey], current);
      } else {
        const _comp = compare[bKey] || {};
        if (current.value === _comp.value) delete base[bKey];
      }
    });
    return base;
  }

  private hasDefaultComposition(): boolean {
    return !!this.children.filter(i => i.name.toLowerCase() === '__default__').length;
  }

  private inheritanceInfo() {
    const instance = this.children[this.children.length - 1] || this;
    if (this.comment) instance.comment = this.comment;
    if (this.deprecated) instance.deprecated = this.deprecated;
  }

  private extractStyleFromComponent(): {[key: string]: any} {
    if ((ComponentFactory.isComponent(this.node!!) || ComponentFactory.isVector(this.node!!))
      && this.name.indexOf('.') === -1
    ) {
      const extracted = ComponentFactory.extractFromComponent(
        this.node!!,
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
      let current = item[key];
      if (current.value) {
        const value = this.findByValue(current.value, foundation, key);
        if (value.indexOf('{') === 0) {
          item[key] = {
            ...current,
            value:  ComponentFactory.composeInheritanceName(value),
            ...this.setInfo('components')
          };
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
