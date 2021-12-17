import {Auth, AuthAction, AuthActionTypes} from "../../components/types/auth";

const inititialState: Auth = {
  text: 'Hello chlopak',
  currentUser: {},
  isLogin: false,
  message: '',
  isRegistration: false,
  waitingCode: false
}


export default function authReducer(state = inititialState, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.AUTH_USERDATA:
      return  {
      ...state, currentUser: {
          id: action.id,
          email: action.email,
          userName: action.userName,
          currentOrder: action.currentOrder,
          role: action.role,
          avatar: action.avatar
        },
        isLogin: true
    }
    case AuthActionTypes.AUTH_LOGIN:
      return {
        ...state, isLogin: true
      }
    case AuthActionTypes.AUTH_EXIT :
      localStorage.removeItem('token')
      localStorage.removeItem('longExpire')
      return {
        ...state,
        currentUser: {},
        isLogin: false
      }
    case AuthActionTypes.AUTH_NEW_MESSAGE :
      return  {
        ...state, message: action.payload
      }
    case AuthActionTypes.AUTH_REGISTR:
      return {
        ...state, isRegistration: action.payload
      }
    case AuthActionTypes.AUTH_WAITING:
      return {
        ...state, waitingCode: action.payload
      }
    default: return {
      ...state
    }
    case AuthActionTypes.AUTH_CHANGE_NAME:
      return {
        ...state, currentUser: {...state.currentUser, userName: action.payload}
      }
    case AuthActionTypes.AUTH_UPLOAD_PHOTO:
      return {
        ...state, currentUser: {...state.currentUser, avatar: action.payload}
      }
  }
}

export const newMessage = (message: string) => ({
  type: AuthActionTypes.AUTH_NEW_MESSAGE,
  payload: message
})

export const setLogin = (isLogin: boolean) => ({
  type: AuthActionTypes.AUTH_LOGIN,
  payload: isLogin
})