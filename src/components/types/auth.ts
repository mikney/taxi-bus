export interface Auth {
  text: string
  currentUser: CurrentUser
  isLogin: boolean
  message: string
}

export enum AuthActionTypes {
  AUTH_EXIT = 'EXIT',
  AUTH_USERDATA = 'USERDATA',
  AUTH_NEW_MESSAGE = 'NEWMESSAGE',
}

export interface CurrentUser {
  id?: number
  email?: any
  userName?: string
  currentOrder?: any
  role?: any
}

export interface ExitPage {
  type: AuthActionTypes.AUTH_EXIT
}
export interface NewMessage {
  type: AuthActionTypes.AUTH_NEW_MESSAGE
  payload: any
}

export interface  UserData {
  type: AuthActionTypes.AUTH_USERDATA,
  id: number,
  email: any,
  userName: any,
  currentOrder: any,
  role: any
}


export type UserAction = ExitPage | UserData | NewMessage
