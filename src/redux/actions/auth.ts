import axios from "axios";
import {AuthAction, AuthActionTypes, UserData} from "../../components/types/auth";
import {Dispatch} from "redux";
import {newMessage} from "../reducers/auth";
import {RootState} from "../reducers/rootReducer";

export const userData = (user: any): UserData => {
  return {
    type: AuthActionTypes.AUTH_USERDATA,
    id: user.id,
    email: user.email,
    userName: user.userName,
    currentOrder: user.currentOrder,
    role: user.role,
    avatar: user?.avatar
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
        localStorage.setItem('id', resp.data.user.id)
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

export const changeName = (userName: string) => {
  return async (dispatch: Dispatch<AuthAction>, getState: () => RootState) => {
    try {
      const resp : any = await axios.put("http://localhost:5002/api/user/changename", {userName, id: getState().auth.currentUser.id, })
      console.log(resp)
      dispatch({type: AuthActionTypes.AUTH_CHANGE_NAME, payload: resp.data})
      console.log(resp)
    } catch (e) {
      console.log(e)
    }
  }
}

export const uploadImageD = (files: any, id: any) => {
  return async (dispatch: Dispatch<AuthAction> | any) => {
    const file = files;
    console.log(file)
    console.log(files)
    console.log(id)
    const formData = new FormData();
    formData.append('file', file)
    // formData.append('id', id)
    // formData.append('id', "hello")
    const config = {
      headers: {
        "Content-Type":"multipart/form-data"
      },
      params: {id}
    };
    const resp = await axios.post("http://localhost:5002/api/test/upload", formData, config)
    console.log(resp)
    dispatch({type: AuthActionTypes.AUTH_UPLOAD_PHOTO, payload: resp.data.file.url})
    dispatch(newMessage("Фотография добавлена!"))
  }
}

export const getUserInfo = (id: string | null) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    if (!id) return
    try {
      const resp = await axios.get("http://localhost:5002/api/user/getuser", {params: {id}})
      console.log(resp.data)
      if (resp.status !== 200) {
        console.log("resp error")
      }
      dispatch(userData(resp.data.user))
    } catch (e) {
      console.log(e)
    }

  }
}
