import axios from "axios";
import {checkError401} from "../../Util/checkError";
import {SPas, TaxiActionTypes} from "../../components/types/taxi";






export const setDate = (response: any, date: any) => {
  console.log(date)
  return {
    type: TaxiActionTypes.TAXI_SETDATE,
    date,
    payload: response
  }
}


export const getTaxi = (date: number, month: string, from: string ) => {
  return async (dispatch : any) => {
    try {
    const response = await axios.post('http://localhost:5002/api/taxi/findtaxidriver', {date, month, from})
      console.log(response)
      if (!response.data) {
        throw new Error('data not found')
      }
    dispatch(setDate(response.data, {date, month}))
    } catch (e) {
      // checkError401(e)
      console.log(e)
    }
  }
}

export const setPassenger = (time: any, driverName: any, carMake: any, numberDay: any, carPhoto: any, wifi: any, tv: any, v220: any, avatar: any, carColor: any, transporter: any, number: any, driverPhone: any) => {
  return (dispatch: any, store: any) => {
    dispatch(sPas(time, store().taxi.currentDay, store().auth.currentUser.id, driverName, carMake, numberDay, carPhoto, wifi, tv, v220, avatar, carColor, transporter, number, driverPhone))
  }
}

export const sPas = (time: any, date: any, passenger: any, driverName: any, carMake: any, numberDay: any, carPhoto: any, wifi: any, tv: any, v220: any, avatar: any, carColor: any, transporter: any, number: any, driverPhone: any): SPas => {
  return {
    type: TaxiActionTypes.TAXI_SPAS,
    time, date, passenger, driverName, carMake, numberDay, carPhoto, wifi, tv, v220, avatar, carColor, transporter, number, driverPhone
  }
}

export const sendPassenger = () => {
  return async (dispatch: any, state: any) => {
    try {
      const {time, date, passenger} = state().taxi.currentTaxi
      const resp = await axios.post('http://localhost:5002/api/taxi/addpassengers', {passenger, time, date})

    } catch (e) {
      console.log(e)
    }

  }
}