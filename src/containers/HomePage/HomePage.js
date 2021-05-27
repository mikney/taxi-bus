import UserInfo from "../../components/UserInfo/UserInfo";
import '../../scss/HomePage.scss'
import React from 'react'
import Nav from "../../components/Nav/Nav";
import ChooseRoute from "../../components/ChooseRoute/ChooseRoute";
import SelectData from "../../components/SelectData/SelectData";
import NumberPlace from "../../components/NumberPlace/NumberPlace";
import SelectTimeDriver from "../../components/SelectTimeDriver/SelectTimeDriver";

export default function () {
  return (
    <div className="container">
      <UserInfo />
      <Nav />
      <ChooseRoute />
      <SelectData />
      <NumberPlace />
      <SelectTimeDriver />
    </div>
  )
}