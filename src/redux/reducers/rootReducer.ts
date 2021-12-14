// import {combineReducers} from 'react-redux'

import {combineReducers} from "redux";
import authReducer from "./auth";
import taxiReducer from "./taxi";
import {driverReducer} from "./driver";
import CurrentValueReducer from "./currentValue";

export const rootReducer =  combineReducers ({
  auth: authReducer,
  taxi: taxiReducer,
  driver: driverReducer,
  value: CurrentValueReducer
})

export type RootState = ReturnType<typeof rootReducer>
// export type AppDispatch = typeof rootReducer.dispatch