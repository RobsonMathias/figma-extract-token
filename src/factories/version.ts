import {InitializerFactory} from './initializer';
import {ResponseVersion} from '../services';
import {Version, VersionJson} from '../interfaces/version';

export class VersionFactory {
  public json: Partial<VersionJson> = {};
  public main: InitializerFactory;

  constructor(main: InitializerFactory) {
    this.main = main;
  }

  call(response: ResponseVersion) {
    this.json = this.getLastValidVersion(response);
  }

  private static isValid(version: Version) {
    return version.description && version.label;
  }

  getLastValidVersion(response: ResponseVersion): Partial<VersionJson> {
    return {
      current: response.versions.find(v => VersionFactory.isValid(v)),
      all: response.versions.filter(v => VersionFactory.isValid(v))
    };
  }

}
