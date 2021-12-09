import {CurrentValue, CurrentValueAction, CurrentValueActionTypes, ISetFrom} from "../../components/types/currentValue";


const initialState: CurrentValue = {
  from: 'Барановичи'
}


export default function CurrentValueReducer(state = initialState, action: CurrentValueAction) {
  switch (action.type) {
    case CurrentValueActionTypes.SET_FROM:
      return  {
      ...state,
        from: action.payload
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
