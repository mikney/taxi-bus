import React from 'react';
import SelectData from "../SelectData/SelectData";
import {useSelector} from "react-redux";
import OrderList from "./components/OrderList";

const HomePageDriver = () => {
  const {role} = useSelector(state => ({role: state.auth.currentUser.role}))
  return (
    <div>
      <SelectData role={role} />
      <OrderList />
    </div>
  );
};

export default HomePageDriver;