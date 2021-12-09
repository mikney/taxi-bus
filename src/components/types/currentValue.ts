

export interface CurrentValue {
  from: string
}


export enum CurrentValueActionTypes {
  SET_FROM = 'SET_FROM'
}


export interface ISetFrom {
  type: CurrentValueActionTypes.SET_FROM
  payload: string
}


export type CurrentValueAction = ISetFrom