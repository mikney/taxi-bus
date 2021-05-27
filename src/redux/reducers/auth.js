
const inititialState = {
  text: 'Hello chlopak',
  isLogin: false
}


export default function authReducer(state = inititialState, action) {
  switch (action.type) {
    case 'TEST':
      return  {
      ...state, text: action.text
    }
    default: return {
      ...state
    }
  }
}