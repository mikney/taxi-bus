

export interface CurrentValue {
  from: string,
  orderList: any[]
  passengersCounter: number
}


export enum CurrentValueActionTypes {
  SET_FROM = 'SET_FROM',
  GET_ORDERS = "GET_ORDERS",
  SET_PASSENGERS = "SET_PASSENGERS"
}


export interface ISetPassengers {
  type: CurrentValueActionTypes.SET_PASSENGERS
  payload: number
}

export interface ISetFrom {
  type: CurrentValueActionTypes.SET_FROM
  payload: string
}

export interface GetOrders {
  type: CurrentValueActionTypes.GET_ORDERS,
  payload: any
}


export type CurrentValueAction = ISetFrom | GetOrders | ISetPassengers