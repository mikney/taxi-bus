import React, {useState} from 'react';
import {Switch, Router, Redirect, Route} from "react-router-dom";
import UserInfo from "../../components/UserInfo/UserInfo";
import Nav from "../../components/Nav/Nav";
import HomeDriver from "./HomeDriver";
import DriverPassengers from "../../components/Driver/DriverPassengers";
import HomePageDriver from "../../components/Driver/HomePageDriver";
import DriverForm from "./DriveForm/DriverForm";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";


const Taxi = () => {


  const {id, infoFilled}: any = useSelector<RootState>(state => ({
    id: state.auth.currentUser.id,
    infoFilled: state.auth.currentUser.infoFilled
  }))

  const isOly: boolean = false


  return (
    <>
      {infoFilled ? <>
        <UserInfo/>
        <Nav tabs={['Мои заказы', 'Выход']}/>
        <Switch>

          <Route path={'/taxi/:date'} component={DriverPassengers} />
          <Route path={'/myorder'} exact component={HomeDriver}/>
          <Route path={'/'} component={HomePageDriver} />
          <Redirect to={'/'}/>
        </Switch>
      </>
          :
          <DriverForm />
      }
    </>

  );
};

export default Taxi;