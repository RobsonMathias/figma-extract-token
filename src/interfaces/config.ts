export type Extract = string[] | {[key: string]: string|null};
export type Inheritance = {[key: string]: string|null};
export type Variant = string[];

export interface Child {
  __base__?: {[key: string]: string|null};
  extract?: Extract;
  variant?: Variant;
  deprecated?: boolean;
  comment?: string;
}

export interface Children {
  [key: string]: Child;
}

export interface Canvas {
  name: string;
  children?: Children;
  inheritance?: Inheritance;
}

export interface Config {
  outDir: string;
  dictionaryConfig: string;
  foundation: Canvas;
  components: Canvas;
}
