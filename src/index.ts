import {tasks} from './tasks';
import {MainFactory} from './factories';

(async ()=>{
  const factory = new MainFactory();
  tasks.run({factory}).catch((err: any) => {
    console.error(err);
  });

})();
