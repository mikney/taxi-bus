import {useDispatch} from "react-redux";
import {exitPage} from "../redux/actions/auth";


export const checkError401 = (error: any) => {
  const dispatch = useDispatch()
  if(error.status === 401) {
    dispatch(exitPage())
  }
}