export type TYPE = 'DOCUMENT' | 'CANVAS' | 'FRAME'

export interface Document {
  id: string;
  name: string;
  type: TYPE;
  children?: Node[];
}

export interface Color {r: number, g: number, b: number, a: number}

export interface Paint {
  blendMode: string;
  color: Color;
  type: string;
}

export interface Node {
  backgroundColor: Color;
  children?: Node[];
  id: string;
  name: string;
  prototypeDevice: {[key: string]: string};
  type: TYPE;
  absoluteBoundingBox: {x: number, y: number, width: number, height: number};
  background: Paint[];
  blendMode: string;
  clipsContent: boolean;
  constraints: {vertical: string, horizontal: string}
  effects: any[]
  fills: Paint[]
  strokeAlign: string;
  strokeWeight: number;
  strokes: any[]
}
