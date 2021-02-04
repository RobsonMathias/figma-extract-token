import {tasks} from './tasks';

(async ()=>{

  tasks.run().catch((err: any) => {
    console.error(err);
  });

})();
