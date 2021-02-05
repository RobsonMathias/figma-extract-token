export type ComposeType = 'camelcase' | 'snakecase';

export type Extract = string[] | {[key: string]: string|null};

export interface Child {
  __base__?: {[key: string]: string|null};
  extract?: Extract;
}

export interface Children {
  [key: string]: Child;
}

export interface Canvas {
  name: string;
  extensionRequired?: boolean;
  children?: Children;
}

export interface Config {
  composeName:ComposeType;
  prefix: string;
  theme: Canvas;
  components: Canvas;
}
