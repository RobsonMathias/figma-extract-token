import {tasks} from './tasks';
import {InitializerFactory} from './factories';

(async ()=>{
  const factory = new InitializerFactory();
  tasks.run({factory}).catch((err: any) => {
    console.error(err);
  });
})();
