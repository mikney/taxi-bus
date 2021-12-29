import {Taxi, TaxiAction, TaxiActionTypes} from "../../components/types/taxi";

const initialState: Taxi = {
  currentDate: [],
  currentTaxi: {},
  currentDay: null
}


export default function taxiReducer(state = initialState, action: TaxiAction) {
  switch (action.type) {
    case TaxiActionTypes.TAXI_SETDATE:
      return {
        ...state, currentDate: action.payload, currentDay: action.date
      }
    case TaxiActionTypes.TAXI_SPAS:
      return {
        ...state,
        currentTaxi: {
          time: action.time,
          date: action.date,
          passenger: action.passenger,
          driverName: action.driverName,
          carMake: action.carMake,
          numberDay: action.numberDay,
          carPhoto: action.carPhoto,
          wifi: action.wifi,
          tv: action.tv,
          v220: action.v220,
          avatar: action.avatar,
          carColor: action.carColor,
          transporter: action.transporter,
          number: action.number,
          driverPhone: action.driverPhone
        }
      }
    default: return state
  }
}