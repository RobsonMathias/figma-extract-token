import {Compose} from './compose';
import {MainFactory} from './main';
import {Canvas, Child, Dictionary, Node} from '../interfaces';
import {ChildFactory} from './child';

export class ParentFactory extends Compose<ChildFactory> {
  public canvas: Canvas|undefined;

  constructor(main: MainFactory) {
    super(main);
  }

  addChildren(name: string, child: Child, node: Node|undefined) {
    if (node) {
      this.children.push(new ChildFactory(name, child, node, this.main));
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

  call(canvas: Canvas): void {
    this.name = canvas.name;
    this.canvas = canvas;
    this.canvas.children = this.canvas.children || {};
    this.node = this.fetchNode(this.name, this.main.json.document.children);
    if (this.node) {
      Object.keys(this.canvas.children).forEach(name => {
        //@ts-ignore
        const child = this.canvas.children[name];
        this.addChildren(name, child, this.composeChild(this.node?.children, name, child));
      });
    } else {
      console.error(`Node ${this.name} was not found on figma JSON`);
    }
  }

}
