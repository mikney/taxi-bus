
const initialState = {
  currentDate: [],
  currentTaxi: {},
  currentDay: null
}


export default function taxiReducer(state = initialState, action) {
  switch (action.type) {
    case 'SETDATE':
      return {
        ...state, currentDate: action.payload, currentDay: action.date
      }
    case 'SPAS':
      return {
        ...state,
        currentTaxi: {time: action.time, date: action.date, passenger: action.passenger}
      }
    default: return state
  }
}