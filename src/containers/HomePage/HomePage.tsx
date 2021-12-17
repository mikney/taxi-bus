import UserInfo from "../../components/UserInfo/UserInfo";
import '../../scss/HomePage.scss'
import React, {useEffect, useState} from 'react'
import Nav from "../../components/Nav/Nav";
import ChooseRoute from "../../components/ChooseRoute/ChooseRoute";
import SelectData from "../../components/SelectData/SelectData";
import NumberPlace from "../../components/NumberPlace/NumberPlace";
import SelectTimeDriver from "../../components/SelectTimeDriver/SelectTimeDriver";
import MyOrder from "./MyOrder/MyOrder";
import PlaceOrder from "../../Layout/PlaceOrder";
import Taxi from "../TaxiDriver/Taxi";
import {useDispatch, useSelector} from "react-redux";
import ToolMessage from "../../components/toolMessage/toolMessage";
import {newMessage} from "../../redux/reducers/auth";
import {RootState} from "../../redux/reducers/rootReducer";

const  HomePage = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState<any>(true)
  const [order, setOrder] = useState<boolean>(false)
  const {role, message}: any = useSelector<RootState>(state => ({role: state.auth.currentUser.role, message: state.auth.message}))
  console.log(show)



  useEffect(() => {
    // if (localStorage.getItem("id")) {
    //   dispatch(getUserInfo(localStorage.getItem("id")))
    // }
  },[])

  function newMessages() {
    setTimeout(() => {
      dispatch(newMessage(''))
    }, 1000)
    return <ToolMessage message={message} />
  }
  return (
    <div className="container">
      {role ? < Taxi/> :
        <>
          <UserInfo/>
          <Nav setShow={setShow} show={show}/>
          {show === "myorder" ?
            <MyOrder/>
            : show === "placeorder" ?
              <PlaceOrder setShow={setShow} show={show}/>
              : <>
                <ChooseRoute/>
                <SelectData/>
                <NumberPlace/>
                <SelectTimeDriver setShow={setShow} show={show}/>
              </>
          }
        </>
      }
      {message ? newMessages() : ''}
    </div>
  )
}
export default HomePage