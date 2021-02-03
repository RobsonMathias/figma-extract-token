import axios from 'axios';
import {Document} from './figma';

export interface Response {
  version: string;
  lastModified: string;
  name: string;
  document: Document
}

export async function fetchJson(token: string, document: string): Promise<Response> {
  return axios.get(`https://api.figma.com/v1/files/${document}`, {headers: {'x-figma-token': token}})
}
