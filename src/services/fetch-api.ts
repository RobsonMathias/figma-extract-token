import axios from 'axios';
import {Document} from '../interfaces';

export interface Component {
  key: string;
  name: string;
  description: string;
}

export interface Components {
  [key: string]: Component
}

export interface Response {
  version: string;
  lastModified: string;
  name: string;
  document: Document;
  components: Components
}

export async function fetchApi(token: string, document: string): Promise<{data: Response}> {
  return axios.get(`https://api.figma.com/v1/files/${document}`, {headers: {'x-figma-token': token}})
}
