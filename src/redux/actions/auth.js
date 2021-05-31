import axios from "axios";

export const userData = (user) => {
  return {
    type: 'USERDATA',
    user
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
        dispatch(userData(resp.data.user))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

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
