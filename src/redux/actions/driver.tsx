import axios, {AxiosResponse} from "axios";


// @ts-ignore
import {newMessage} from "../reducers/auth.ts";
import {getTaxi} from "./taxi";


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

export const addDriverDate = (date: any, taxiDriver: any, time: string, month: any, from: string) => {
  return async (dispatch: any) => {
    try {
      const resp: {message: any} = await axios.post('http://localhost:5002/api/taxi/adddate', {date, taxiDriver, time, month, from})
      console.log(resp.message)
      dispatch(getTaxi(date, month, from))
      dispatch(newMessage('Добавлено!'))
    } catch (e) {
      dispatch(newMessage('Ошибка...'))
      console.log(e)
    }
  }
}