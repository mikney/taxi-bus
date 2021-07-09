import axios from "axios";


export const drives = (resp) => {
  return {
    type: 'GETPASSENGERS',
    payload: resp
  }
}


export const getPass = () => {
  return async dispatch => {
    try {
      console.log('<<<<<<:::USED:::::>>>>>>')
      const resp = await axios.post('http://localhost:5002/api/taxi/pdriver', {driver: "60d477b4afc3e22514f35513"})
      dispatch(drives(resp.data))
    } catch (e) {
      console.log(e)
    }
  }
}

export const addDriverDate = (date, taxiDriver, time) => {
  return async dispatch => {
    try {
      const resp = await axios.post('http://localhost:5002/api/taxi/adddate', {date, taxiDriver, time})
      console.log(resp.message)
    } catch (e) {
      console.log(e)
    }
  }
}