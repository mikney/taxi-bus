import createSpacing from "@material-ui/core/styles/createSpacing";
import {Auth, AuthActionTypes, UserAction} from "../../components/types/auth";

const inititialState: Auth = {
  text: 'Hello chlopak',
  currentUser: {},
  isLogin: false,
  message: '',
}


export default function authReducer(state = inititialState, action: UserAction) {
  switch (action.type) {
    case AuthActionTypes.AUTH_USERDATA:
      return  {
      ...state, currentUser: {
          id: action.id,
          email: action.email,
          userName: action.userName,
          currentOrder: action.currentOrder,
          role: action.role
        },
        isLogin: true
    }
    case AuthActionTypes.AUTH_EXIT :
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {},
        isLogin: false
      }
    case AuthActionTypes.AUTH_NEW_MESSAGE :
      return  {
        ...state, message: action.payload
      }
    default: return {
      ...state
    }
  }
}

export const newMessage = (message: string) => ({
  type: AuthActionTypes.AUTH_NEW_MESSAGE,
  payload: message

})