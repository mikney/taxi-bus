import {
  CurrentValue,
  CurrentValueAction,
  CurrentValueActionTypes,
  ISetFrom,
  ISetPassengers
} from "../../components/types/currentValue";


const initialState: CurrentValue = {
  from: 'Барановичи',
  orderList: [],
  passengersCounter: 1
}


export default function CurrentValueReducer(state = initialState, action: CurrentValueAction) {
  switch (action.type) {
    case CurrentValueActionTypes.SET_FROM:
      return  {
      ...state,
        from: action.payload
    }
    case CurrentValueActionTypes.GET_ORDERS:
      return {
        ...state, orderList: action.payload
      }
    case CurrentValueActionTypes.SET_PASSENGERS:
      return {
        ...state, passengersCounter: action.payload
      }
    default: return {
      ...state
    }
  }
}

export const SetFrom = (from: string): ISetFrom => ({
  type: CurrentValueActionTypes.SET_FROM,
  payload: from
})

export const SetNumberOfPassengers = (number: number): ISetPassengers => ({
  type: CurrentValueActionTypes.SET_PASSENGERS,
  payload: number
})
