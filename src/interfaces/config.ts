export type Extract = string[] | {[key: string]: string|null};
export type Inheritance = {[key: string]: string|null|Inheritance};
export type MatchInheritance = {[key: string]: string|null};
export type Variant = string[];

export type ChildType  = 'foundation' | 'components';

export interface Child {
  __base__?: {[key: string]: string|null};
  extract?: Extract;
  variant?: Variant;
  deprecated?: boolean;
  comment?: string;
  type?: ChildType;
}

export interface Children {
  [key: string]: Child;
}

export interface Canvas {
  name: string;
  children?: Children;
  inheritance?: Inheritance;
  matchInheritance?: MatchInheritance;
}

export interface Config {
  outDir: string;
  dictionaryConfig: string;
  foundation: Canvas;
  components: Canvas;
}
