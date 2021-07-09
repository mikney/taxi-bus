import axios from "axios";

export const userData = (user) => {
  return {
    type: 'USERDATA',
    id: user.id,
    email: user.email,
    userName: user.userName,
    currentOrder: user.currentOrder,
    role: user.role
  }
}
export const exitPage = () => {
  return {
    type: "EXIT"
  }
}


export const auth = (email, password) => {
  return async dispatch => {
    try {
      console.log('PAROL', password)
      const resp = await axios.post('http://localhost:5002/api/auth/login',{email, password})
      if (typeof resp.data.token !== "undefined") {
        localStorage.setItem('token', resp.data.token)
        console.log(resp.data.user, ' data')
        dispatch(userData(resp.data.user))
      }
    } catch (e) {
      console.log(e)
    }
  }
}
//id(pin):'60b4d7184811ab1434627939'
// email(pin):'375295280287'
// userName(pin):'Pasha'
export const reAuth = () => {
  return async dispatch => {
    try {
      const resp = await axios.get('http://localhost:5002/api/auth/auth', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(userData(resp.data.user))
      localStorage.setItem('token', resp.data.token)
    } catch (e) {
      console.log(e)
      localStorage.removeItem('token')
    }
  }
}
