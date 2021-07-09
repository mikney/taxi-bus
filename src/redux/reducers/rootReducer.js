// import {combineReducers} from 'react-redux'

import {combineReducers} from "redux";
import authReducer from "./auth";
import taxiReducer from "./taxi";
import {driverReducer} from "./driver";

export default combineReducers ({
  auth: authReducer,
  taxi: taxiReducer,
  driver: driverReducer
})