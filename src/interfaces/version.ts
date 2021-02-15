export interface Version {
  id: string;
  createdAt: string;
  label: string;
  description: string;
  user: User;
}

export interface VersionJson {
  current?: Version;
  all: Version[]
}

export interface User {
  name: string;
  imgUrl: string;
  id: string;
}
