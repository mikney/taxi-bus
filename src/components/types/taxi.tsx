

export interface Taxi {
  currentDate: any[]
  currentTaxi: any,
  currentDay: any
}

export enum TaxiActionTypes {
  TAXI_SETDATE = "SETDATE",
  TAXI_SPAS = "SPAS"
}


export interface SetDate {
  type: TaxiActionTypes.TAXI_SETDATE
  payload: any
  date: any
}


export interface SPas {
  type: TaxiActionTypes.TAXI_SPAS
  time: any
  date: any
  passenger: any
  driverName: any
  carMake: any
  numberDay: any
  carPhoto: any
  wifi: any
  tv: any
  v220: any
  avatar: any
  carColor: any
  transporter: any
  number: any
  driverPhone: any
}


export type TaxiAction = SetDate | SPas
