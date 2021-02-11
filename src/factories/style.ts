import {Child, Node, Paint} from '../interfaces';

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

  static fills(colors: Paint[]): string {
    const [fill] = colors;
    return `rgba(${this.calcRGB(fill.color.r)}, ${this.calcRGB(fill.color.g)}, ${this.calcRGB(fill.color.b)}, ${fill.color.a})`
  }

  static valueByUnit(value: string|number, unit: string): string {
    return value ? `${value}${this.getUnit(unit)}`: '';
  }

  static textTransform(value: string) {
    const data: {[key: string]: string} = {
      'UPPER': 'uppercase'
    };
    return data[value] || value;
  }

  static extract(attribute: string, node: Node): string {
    const style = node.style || {};
    switch (attribute) {
      case 'fills':
      case 'background':
        return this.fills(node[attribute]);
      case 'lineHeightPx':
        return this.valueByUnit(style.lineHeightPx, style.lineHeightUnit);
      case 'letterSpacing':
      case 'fontSize':
        return this.valueByUnit(style[attribute], 'PIXELS');
      case 'fontFamily':
      case 'fontWeight':
        return style[attribute];
      case 'textCase':
        return this.textTransform(style[attribute]);
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

  static mapFoundation(foundation: any):  {[key: string]: string|number} {
    const map: {[key: string]: string|number} = {};
    function extract(name: string, _foundation: any) {
      Object.keys(_foundation).forEach((i: string) => {
        if (i === 'value') {
          map[name] = _foundation[i];
        } else {
          const newName = `${name}.${i}`;
          extract(newName, _foundation[i]);
        }
      });
    }
    Object.keys(foundation).forEach(f => extract(f, foundation[f]));
    return map;
  }

  static extractFromComponent(node: Node, child: Child, inheritance: any): {[key: string]: object}  {
    const attributes = [
      'fills',
      'lineHeightPx',
      'letterSpacing',
      'fontSize',
      'fontFamily',
      'fontWeight',
      'textCase',
      'cornerRadius',
      'background',
    ];
    let result: {[key: string]: any} = {};
    attributes.forEach(a => {
      const value = this.extract(a, node);
      if (value) {
        result[inheritance[a] || a] = {value};
      }
    });
    return result;
  }

  static formatName(name: string): string {
    const value = name.match(/\w+/g) || [name];
    return value[value.length - 2] || value[value.length -1];
  }
}
