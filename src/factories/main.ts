import {Response} from '../services';
import {Config} from '../interfaces';
import {ParentFactory} from './parent';

export class MainFactory {
  //@ts-ignore
  public json: Response;
  //@ts-ignore
  private _config: Config;
  public theme: ParentFactory;
  public components: ParentFactory;

  constructor() {
    this.theme =  new ParentFactory(this);
    this.components =  new ParentFactory(this);
  }

  get config(): Config {
    return this._config;
  }

  set config(value: Config) {
    this._config = value;
    this.theme.name = value.theme.name;
    this.components.name = value.components.name;
  }

}
