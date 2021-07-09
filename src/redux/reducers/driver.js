

const initialState = {
  pass: []
}

export const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETPASSENGERS':
      return {
      ...state, pass: action.payload
    }
    default: return state
  }
}