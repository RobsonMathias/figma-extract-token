import {composeArgs} from './compose-args';
import {fetchJson} from './fetch-json';

(async ()=>{
  const args = composeArgs(process.argv);
  const json = await fetchJson(args.token, args.document);
  console.log(json);
})();
