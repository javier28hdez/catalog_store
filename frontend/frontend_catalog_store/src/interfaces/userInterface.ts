export interface userToken {
  refresh: string;
  access: string;
}

export interface userInterface {
  response: string;
  username: string;
  token: userToken;
}
