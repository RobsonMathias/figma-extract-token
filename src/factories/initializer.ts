import {Response} from '../services';
import {Config, Dictionary} from '../interfaces';
import {ComposerFactory} from './composer';

export class InitializerFactory {
  //@ts-ignore
  public json: Response;
  //@ts-ignore
  private _config: Config;
  public foundation: ComposerFactory;
  public components: ComposerFactory;

  constructor() {
    this.foundation =  new ComposerFactory(this);
    this.components =  new ComposerFactory(this);
  }

  get config(): Config {
    return this._config;
  }

  set config(value: Config) {
    this._config = value;
    this.foundation.call(value.foundation);
    this.components.call(value.components, true)
  }

  compose(): Dictionary {
    const {foundation} = this.foundation.compose();
    const {components} = this.components.compose(foundation);
    // const foundationComposed = this.inheritanceFoundation(foundation as Dictionary);
    // const componentsComposed = this.inheritanceComponent(
    //   components as Dictionary,
    //   Style.mapFoundation(foundationComposed) as Dictionary
    // );
    return {
      ...(foundation as any),
      ...(components as any)
    };
  }

}
