import axios from "axios";






export const setDate = (response, date) => {
  console.log(date)
  return {
    type: 'SETDATE',
    date,
    payload: response
  }
}


export const getTaxi = (date) => {
  return async dispatch => {
    try {
    const response = await axios.post('http://localhost:5002/api/taxi/findtaxidriver', {date})
      console.log(response)
      if (!response.data) {
        throw new Error('data not found')
      }
    dispatch(setDate(response.data, date))
    } catch (e) {
      console.log(e)
    }
  }
}
export const setPassenger = (time) => {
  return (dispatch, store) => {
    dispatch(sPas(time, store().taxi.currentDay, store().auth.currentUser.id))
  }
}

export const sPas = (time, date, passenger) => {
  return {
    type: 'SPAS',
    time, date, passenger
  }
}

export const sendPassenger = () => {
  return async (dispatch, state) => {
    try {
      const {time, date, passenger} = state().taxi.currentTaxi
      const resp = await axios.post('http://localhost:5002/api/taxi/addpassengers', {time, date, passenger})

    } catch (e) {
      console.log(e)
    }

  }
}