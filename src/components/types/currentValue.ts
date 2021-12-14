

export interface CurrentValue {
  from: string,
  orderList: any[]
}


export enum CurrentValueActionTypes {
  SET_FROM = 'SET_FROM',
  GET_ORDERS = "GET_ORDERS"
}


export interface ISetFrom {
  type: CurrentValueActionTypes.SET_FROM
  payload: string
}

export interface GetOrders {
  type: CurrentValueActionTypes.GET_ORDERS,
  payload: any
}


export type CurrentValueAction = ISetFrom | GetOrders