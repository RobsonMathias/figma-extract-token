export type ComposeType = 'camelcase' | 'snakecase';

export interface Child {
  root?: {[key: string]: string|null};
  extract?: string[] | {[key: string]: string|null};
}

export interface Canvas {
  name: string;
  extensionRequired: boolean;
  children: {
    [key: string]: Child;
  };
}

export interface Config {
  composeName:ComposeType;
  prefix: string;
  theme: Canvas;
  components: Canvas;
}
