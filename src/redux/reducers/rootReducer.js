// import {combineReducers} from 'react-redux'

import {combineReducers} from "redux";
import authReducer from "./auth";

export default combineReducers ({
  auth: authReducer
})