import React from 'react';
import SelectData from "../SelectData/SelectData.tsx";
import {useSelector} from "react-redux";
import OrderList from "./components/OrderList.tsx";
import ChooseRoute from "../ChooseRoute/ChooseRoute";

const HomePageDriver = () => {
  const {role} = useSelector(state => ({role: state.auth.currentUser.role}))
  return (
    <div>
      <ChooseRoute />
      <SelectData role={role} />
      <OrderList />
    </div>
  );
};

export default HomePageDriver;