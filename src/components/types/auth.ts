export interface Auth {
  text: string
  currentUser: CurrentUser
  isLogin: boolean
  message: string
  isRegistration: boolean
  waitingCode: boolean
}

export enum AuthActionTypes {
  AUTH_EXIT = 'EXIT',
  AUTH_USERDATA = 'USERDATA',
  AUTH_NEW_MESSAGE = 'NEWMESSAGE',
  AUTH_LOGIN = 'LOGIN',
  AUTH_REGISTR = 'REGISTRATION',
  AUTH_WAITING = 'WAITING',
  AUTH_CHANGE_NAME = "CHANGE_NAME",
  AUTH_UPLOAD_PHOTO = "UPLOAD_PHOTO",

}


export interface ChangeName {
  type: AuthActionTypes.AUTH_CHANGE_NAME,
  payload: string
}
export interface Registration {
  type: AuthActionTypes.AUTH_REGISTR
  payload: boolean
}
export interface WaitingCode {
  type: AuthActionTypes.AUTH_WAITING,
  payload: boolean
}
export interface CurrentUser {
  avatar?: any
  id?: number
  email?: any
  userName?: string
  currentOrder?: any
  role?: any
  infoFilled?: boolean
}
export interface UploadPhoto {
  type: AuthActionTypes.AUTH_UPLOAD_PHOTO,
  payload: string
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
  avatar?: any
  infoFilled?: boolean
}

export interface SetLogin {
  type: AuthActionTypes.AUTH_LOGIN
  payload: boolean
}




export type AuthAction = ExitPage | UserData | NewMessage | SetLogin | Registration | WaitingCode | ChangeName | UploadPhoto
