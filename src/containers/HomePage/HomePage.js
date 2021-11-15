import UserInfo from "../../components/UserInfo/UserInfo";
import '../../scss/HomePage.scss'
import React, {useState} from 'react'
import Nav from "../../components/Nav/Nav";
import ChooseRoute from "../../components/ChooseRoute/ChooseRoute";
import SelectData from "../../components/SelectData/SelectData";
import NumberPlace from "../../components/NumberPlace/NumberPlace";
import SelectTimeDriver from "../../components/SelectTimeDriver/SelectTimeDriver";
import MyOrder from "./MyOrder/MyOrder";
import PlaceOrder from "../../Layout/PlaceOrder";
import DriverPassengers from "../../components/Driver/DriverPassengers";
import CurrentOrderDriver from "../../components/Driver/CurrentOrderDriver";
import HomeDriver from "../TaxiDriver/HomeDriver";
import Taxi from "../TaxiDriver/Taxi";
import {useDispatch, useSelector} from "react-redux";
import ToolMessage from "../../components/toolMessage/toolMessage";
import {newMessage} from "../../redux/reducers/auth";

const  HomePage = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)
  const [order, setOrder] = useState(false)
  const {role, message} = useSelector(state => ({role: state.auth.currentUser.role, message: state.auth.message}))
  console.log(show)
  const template = <>
    <UserInfo/>
    <Nav setShow={setShow} show={show}/>
  </>
  const whatShow = () => {
    if (show === 'myorder') {
      return (
        <>
      <MyOrder  />
      </>
      )
    }
    if (show === 'placeorder') {
      return (
        <>
      <PlaceOrder setShow={setShow} show={show} />
        </>
    )
    }
    return (
      <>
    <ChooseRoute />
    <SelectData />
    <NumberPlace />
    <SelectTimeDriver setShow={setShow} show={show} />
    {/*<DriverPassengers />*/}
      </>
    )
  }
  const whatRender = () => {



    return  role ? < Taxi /> : <>
      {template}
      {whatShow()}
      {/*<ChooseRoute />*/}
      {/*<SelectData />*/}
      {/*<NumberPlace />*/}
      {/*<SelectTimeDriver setShow={setShow} show={show} />*/}

    </>
  }


  function newMessages() {
    setTimeout(() => {
      dispatch(newMessage(''))
    }, 1000)
    return <ToolMessage message={message} />
  }
  return (
    <div className="container">

      {whatRender()}
      {/*{whatShow()}*/}
      {/*{show ? <>*/}
      {/*  <UserInfo/>*/}
      {/*  <Nav setShow={setShow} show={show}/>*/}
      {/*  <ChooseRoute />*/}
      {/*  <SelectData />*/}
      {/*  <NumberPlace />*/}
      {/*  <SelectTimeDriver />*/}
      {/*  </>*/}
      {/*  : <>*/}
      {/*  <UserInfo/>*/}
      {/*  <Nav setShow={setShow} show={show}/>*/}
      {/*  <MyOrder />*/}
      {/*  <PlaceOrder />*/}
      {/*  </>*/}
      {/*}*/}
      {message ? newMessages() : ''}
    </div>
  )
}
export default HomePage