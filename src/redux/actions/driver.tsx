import axios, {AxiosResponse} from "axios";
import {newMessage} from "../reducers/auth";


export const drives = (resp: any) => {
  return {
    type: 'GETPASSENGERS',
    payload: resp
  }
}


export const getPass = () => {
  return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    try {
      console.log('<<<<<<:::USED:::::>>>>>>')
      const resp = await axios.post('http://localhost:5002/api/taxi/pdriver', {driver: "60d477b4afc3e22514f35513"})
      dispatch(drives(resp.data))
    } catch (e) {
      console.log(e)
    }
  }
}

export const addDriverDate = (date: any, taxiDriver: any, time: string) => {
  return async (dispatch: any) => {
    try {
      const resp: {message: any} = await axios.post('http://localhost:5002/api/taxi/adddate', {date, taxiDriver, time, month: 'Ноябрь', from: 'Барановичи' })
      console.log(resp.message)
      dispatch(newMessage('Добавлено саввава'))
    } catch (e) {
      console.log(e)
    }
  }
}