import React from 'react';
import {Switch, Router, Redirect, Route} from "react-router-dom";
import UserInfo from "../../components/UserInfo/UserInfo";
import Nav from "../../components/Nav/Nav";
import HomeDriver from "./HomeDriver";
import DriverPassengers from "../../components/Driver/DriverPassengers";
import HomePageDriver from "../../components/Driver/HomePageDriver";
const Taxi = () => {
  return (
    <>
      <UserInfo/>
      <Nav />
      <Switch>

        <Route path={'/taxi/:date'} component={DriverPassengers} />
        <Route path={'/myorder'} exact component={HomeDriver}/>
        <Route path={'/'} component={HomePageDriver} />
        <Redirect to={'/'}/>
      </Switch>
    </>

  );
};

export default Taxi;