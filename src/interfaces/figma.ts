export type TYPE =
  | 'DOCUMENT'
  | 'CANVAS'
  | 'FRAME'
  | 'GROUP'
  | 'COMPONENT'
  | 'VECTOR'

export interface Document {
  id: string
  name: string
  type: TYPE
  children?: Node[]
}

export interface Color {
  r: number
  g: number
  b: number
  a: number
}

export interface Offset {
  x: number
  y: number
}

export interface Gradient {
  color: Color
  position: number
}

export interface Effect {
  blendMode: string
  color: Color
  type: string
  offset: Offset
  radius: number
}

export interface Paint {
  blendMode: string
  gradientHandlePositions?: Offset[]
  gradientStops?: Gradient[]
  color?: Color
  type: string
}

export interface Node {
  backgroundColor: Color
  children?: Node[]
  id: string
  name: string
  style: { [key: string]: string }
  prototypeDevice: { [key: string]: string }
  type: TYPE
  absoluteBoundingBox: { x: number; y: number; width: number; height: number }
  background: Paint[]
  blendMode: string
  clipsContent: boolean
  constraints: { vertical: string; horizontal: string }
  effects: Effect[]
  fills: Paint[]
  characters: string
  strokeAlign: string
  opacity: number
  strokeWeight: number
  cornerRadius: number
  strokes: any[]
  rectangleCornerRadii: number[]
}
