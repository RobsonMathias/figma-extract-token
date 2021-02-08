import {Response} from '../services';
import {Config, Dictionary} from '../interfaces';
import {ParentFactory} from './parent';

export class MainFactory {
  //@ts-ignore
  public json: Response;
  //@ts-ignore
  private _config: Config;
  public foundation: ParentFactory;
  public components: ParentFactory;

  constructor() {
    this.foundation =  new ParentFactory(this);
    this.components =  new ParentFactory(this);
  }

  get config(): Config {
    return this._config;
  }

  set config(value: Config) {
    this._config = value;
    this.foundation.name = value.foundation.name;
    this.components.name = value.components.name;
  }

  compose(): Dictionary {
    const foundationComposed = this.inheritanceFoundation(this.foundation.compose());
    const componentsComposed = this.inheritanceComponent(
      this.components.compose(),
      foundationComposed as Dictionary
    );
    return {
      ...(foundationComposed as any).foundation,
    };
  }

  private inheritanceFoundation(item: Dictionary): Dictionary {
    let base: any;
    Object.keys(item).forEach((t) => {
      if ((item[t] as any).base) {
        base = (item[t] as any).base;
        Object.keys((item[t] as any)).forEach((p) => {
          if (p !== 'base') {
            Object.keys((item[t] as any)[p]).forEach((v) => {
              const baseValue = (item as any)[t]['base'][v],
                currentValue = (item as any)[t][p][v];
              if (
                (baseValue && currentValue) &&
                currentValue.value === baseValue.value
              ) {
                currentValue.value = `{${t}.base.${v}}`;
              }
            });
          }
        });
      }
    });
    return item;
  }

  private inheritanceComponent(item: Dictionary, foundation: Dictionary): Dictionary {
    console.log(item);
    return item;
  }

}
