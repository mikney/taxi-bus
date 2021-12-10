import axios from "axios";
import {AuthAction, AuthActionTypes, UserData} from "../../components/types/auth";
import {Dispatch} from "redux";
import {newMessage} from "../reducers/auth";

export const userData = (user: any): UserData => {
  return {
    type: AuthActionTypes.AUTH_USERDATA,
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


export const auth = (email: any, password: any, isLongExpire: boolean) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      console.log('PAROL', password)
      const resp = await axios.post('http://localhost:5002/api/auth/login',{email, password, isLongExpire})
      if (typeof resp.data.token !== "undefined") {
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('longExpire', isLongExpire + '')
        console.log(resp.data.user, ' data')
        dispatch(userData(resp.data.user))
      }
      if (resp.data.needCreate) {
        dispatch({type: AuthActionTypes.AUTH_REGISTR, payload: resp.data.needCreate})
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const sendEmailVeriff = (email: any) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    const resp = await axios.post("http://localhost:5002/api/auth/verification", {
      email
    })

    dispatch({type: AuthActionTypes.AUTH_WAITING, payload: true})
  }
}

export const createUser = (phone: any, password: any, checkCode: any) => {
  return async (dispatch: Dispatch<AuthAction | any>) => {
    console.log('ewrewflgd;fksjdpgf')
    const resp = await axios.post("http://localhost:5002/api/auth/create", {
      phone, password, checkCode
    })
    dispatch(newMessage(resp.data.message))
    if (resp.data?.confirmCreate) {
      dispatch({type: AuthActionTypes.AUTH_REGISTR, payload: false})
      dispatch({type: AuthActionTypes.AUTH_WAITING, payload: false})
    }
  }
}

export const reAuth = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const longExpire = localStorage.getItem('longExpire')
      const resp = await axios.get('http://localhost:5002/api/auth/auth', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          longExpire
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
