import {CurrentValueAction, CurrentValueActionTypes} from "../../components/types/currentValue";
import axios from "axios";
import {Dispatch} from "redux";


export const GetOrdersReq = (id: any) => {
  return async (dispatch: Dispatch<CurrentValueAction>) => {
    console.log(id)
    const resp: any = await axios.get("http://localhost:5002/api/user/getorder", {params: {id}})
    console.log(resp)
    dispatch({type: CurrentValueActionTypes.GET_ORDERS, payload: resp.data.orderTransform})
  }
}