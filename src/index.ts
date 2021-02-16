import {tasks} from './tasks';
import {InitializerFactory} from './factories';

const factory = new InitializerFactory();

const Extraction = {
  run: () => {
    tasks.run({factory}).catch((err: any) => {
      console.error(err);
    });
  }
};

(async ()=>{
  Extraction.run();
})();

export {Extraction}
