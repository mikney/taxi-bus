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
import {useSelector} from "react-redux";

const  HomePage = () => {
  const [show, setShow] = useState(true)
  const [order, setOrder] = useState(false)
  const {role} = useSelector(state => ({role: state.auth.currentUser.role}))
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
    </div>
  )
}
export default HomePage