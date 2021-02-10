import {Abstracter} from './abstracter';
import {InitializerFactory} from './initializer';
import {Canvas, Dictionary} from '../interfaces';
import {FoundationFactory} from './foundation';
import {ComponentFactory} from './component';

export class ComposerFactory extends Abstracter<FoundationFactory> {
  public canvas: Canvas|undefined;

  constructor(main: InitializerFactory) {
    super(main);
  }

  get composedName(): string {
    return this.name.toLowerCase();
  }

  addChildren(name: string, instance: FoundationFactory) {
    if (!FoundationFactory.ignoreElement(name)) {
      this.children.push(instance);
    }
  }

  compose(): Dictionary {
    const result: Dictionary = {
      [this.composedName]: {}
    };
    this.children.forEach(c => {
      const root = result[this.composedName];
      // @ts-ignore
      result[this.composedName] = {...root, ...c.compose()};
    });
    return result;
  }

  call(canvas: Canvas, autoRef?: boolean): void {
    this.name = canvas.name;
    this.canvas = canvas;
    this.canvas.children = this.canvas.children || {};
    this.node = this.fetchNode(this.name, this.main.json.document.children);
    if (this.node) {
      Object.keys(this.canvas.children).forEach(name => {
        //@ts-ignore
        const child = this.canvas.children[name];
        const node = this.composeChild(this.node?.children, name, child);
        if (node) {
          const instance = new FoundationFactory(name, child, node, this.main);
          this.addChildren(name, instance);
        }
      });
      if (autoRef) {
        (this.node.children || []).forEach(n => {
          if (ComposerFactory.isComponent(n)) {
            // @ts-ignore
            const child = this.child ? this.child[n.name] : this.child!!;
            const instance = new ComponentFactory(n.name, child, n, this.main);
            this.addChildren(n.name, instance);
          }
        });
      }
    } else {
      console.error(`Node ${this.name} was not found on figma JSON`);
    }
  }

}
