
const inititialState = {
  text: 'Hello chlopak',
  currentUser: {},
  isLogin: false
}


export default function authReducer(state = inititialState, action) {
  switch (action.type) {
    case 'USERDATA':
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
    case 'EXIT' :
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {},
        isLogin: false
      }
    default: return {
      ...state
    }
  }
}