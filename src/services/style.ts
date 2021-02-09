import {Node, Paint} from '../interfaces';

export class Style {

  private static getUnit(key: string): string {
    const data: {[key: string]: string} = {
      'PIXELS': 'px'
    };
    return data[key] || key;
  };

  private static calcRGB(value: number) {
    return Math.round(value*255);
  }

  static fills(fills: Paint[]): string {
    const [fill] = fills;
    return `rgba(${this.calcRGB(fill.color.r)}, ${this.calcRGB(fill.color.g)}, ${this.calcRGB(fill.color.b)}, ${fill.color.a})`
  }

  static valueByUnit(value: string|number, unit: string): string {
    return `${value}${this.getUnit(unit)}`;
  }

  static textTransform(value: string) {
    const data: {[key: string]: string} = {
      'UPPER': 'uppercase'
    };
    return data[value] || value;
  }

  static extract(attribute: string, node: Node): string {
    switch (attribute) {
      case 'fills':
        return this.fills(node.fills);
      case 'lineHeightPx':
        return this.valueByUnit(node.style.lineHeightPx, node.style.lineHeightUnit);
      case 'letterSpacing':
      case 'fontSize':
        return this.valueByUnit(node.style[attribute], 'PIXELS');
      case 'fontFamily':
      case 'fontWeight':
        return node.style[attribute];
      case 'textCase':
        return this.textTransform(node.style[attribute]);
      case 'cornerRadius':
        return this.valueByUnit(node[attribute], 'PIXELS');
      case 'width':
        return this.valueByUnit(node.absoluteBoundingBox[attribute], 'PIXELS');
      case 'characters':
        return node[attribute];
      default:
        return attribute;
    }
  }
}
