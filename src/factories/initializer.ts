import { Response } from '../services'
import { Config, Dictionary } from '../interfaces'
import { ComposerFactory } from './composer'
import { VersionFactory } from './version'

export class InitializerFactory {
  //@ts-ignore
  public json: Response
  //@ts-ignore
  private _config: Config
  public foundation: ComposerFactory
  public components: ComposerFactory
  public version: VersionFactory
  public composed: any

  constructor() {
    this.foundation = new ComposerFactory(this)
    this.components = new ComposerFactory(this)
    this.version = new VersionFactory(this)
  }

  get config(): Config {
    return this._config
  }

  set config(value: Config) {
    this._config = value
    this.foundation.call(value.foundation)
    this.components.call(value.components, true)
  }

  compose(): Dictionary {
    const { foundation } = this.foundation.compose()
    const { components } = this.components.compose(foundation)
    this.composed = { foundation, components }
    return this.composed
  }
}
