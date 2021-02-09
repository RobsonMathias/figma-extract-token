import {Compose} from './compose';
import {MainFactory} from './main';
import {Canvas, Child, Dictionary, Node} from '../interfaces';
import {FoundationFactory} from './foundation';

export class ParentFactory extends Compose<FoundationFactory> {
  public canvas: Canvas|undefined;

  constructor(main: MainFactory) {
    super(main);
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
      if (autoRef) {

      } else {
        Object.keys(this.canvas.children).forEach(name => {
          //@ts-ignore
          const child = this.canvas.children[name];
          const node = this.composeChild(this.node?.children, name, child);
          if (node) {
            const instance = new FoundationFactory(name, child, node, this.main);
            this.addChildren(name, instance);
          }
        });
      }
    } else {
      console.error(`Node ${this.name} was not found on figma JSON`);
    }
  }

}
