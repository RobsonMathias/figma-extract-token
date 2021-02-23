import axios from 'axios'
import { Document } from '../interfaces'
import { Version } from '../interfaces/version'

export interface Component {
  key: string
  name: string
  description: string
}

export interface Components {
  [key: string]: Component
}

export interface Response {
  version: string
  lastModified: string
  name: string
  document: Document
  components: Components
}

export interface ResponseVersion {
  versions: Version[]
}

export async function fetchApi(
  token: string,
  document: string,
): Promise<{ data: Response }> {
  return axios.get(`https://api.figma.com/v1/files/${document}`, {
    headers: { 'x-figma-token': token },
  })
}

export async function fetchVersion(
  token: string,
  document: string,
): Promise<{ data: ResponseVersion }> {
  return axios.get(`https://api.figma.com/v1/files/${document}/versions`, {
    headers: { 'x-figma-token': token },
  })
}
