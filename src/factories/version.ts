import {InitializerFactory} from './initializer';
import * as diff from 'json-diff';
import {ResponseVersion} from '../services';
import {Version, VersionComposed, VersionComposedType, VersionJson} from '../interfaces/version';

export class VersionFactory {
  public json: Partial<VersionJson> = {};
  public main: InitializerFactory;
  public oldData: {[key: string]: any}[] = [];

  constructor(main: InitializerFactory) {
    this.main = main;
  }

  private static isValid(version: Version) {
    return version.description && version.label;
  }

  getOldData() {
    let result = {};
    this.oldData.forEach(o => {
      result = {...result, ...o};
    });
    return result;
  }

  call(response: ResponseVersion) {
    this.json = this.getLastValidVersion(response);
  }

  getLastValidVersion(response: ResponseVersion): Partial<VersionJson> {
    return {
      current: response.versions.find(v => VersionFactory.isValid(v)),
      all: response.versions.filter(v => VersionFactory.isValid(v))
    };
  }

  getType(diffed: string): VersionComposedType {
    if (diffed.indexOf('__deleted') > -1) {
      return 'major';
    } else if(diffed.indexOf('__added') > -1 || diffed.indexOf('__old') > -1) {
      return 'minor';
    } else {
      return 'current';
    }
  }

  compose(): VersionComposed {
    const composed = {...this.main.composed.foundation, ...this.main.composed.components};
    const oldData = this.getOldData();
    const diffed = diff.diff(oldData, composed) || {};
    return {
      type: this.getType(JSON.stringify(diffed)),
      data: diffed
    };
  }

  cloneFiles(config: any[]) {
    this.oldData = config;
  }

}
