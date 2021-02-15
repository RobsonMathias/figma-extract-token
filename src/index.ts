import {tasks} from './tasks';
import {InitializerFactory} from './factories';
import {Versioning} from './versioning';

const factory = new InitializerFactory();
const versioning = new Versioning();

const Extraction = {
  run: () => {
    tasks.run({factory, versioning}).catch((err: any) => {
      console.error(err);
    });
  }
};

(async ()=>{
  Extraction.run();
})();

export {Extraction}
