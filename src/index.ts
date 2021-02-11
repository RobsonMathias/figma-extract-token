import {tasks} from './tasks';
import {InitializerFactory} from './factories';

const factory = new InitializerFactory();

const Extraction = {
  run: (StyleDictionary?: any) => {
    tasks.run({factory, StyleDictionary}).catch((err: any) => {
      console.error(err);
    });
  }
};

(async ()=>{
  Extraction.run();
})();

export {Extraction}
