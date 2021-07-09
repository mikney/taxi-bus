import React from 'react';
import {useSelector} from "react-redux";

const MyOrder = () => {

  const {currentOrder} = useSelector(state => ({currentOrder: state.auth.currentUser.currentOrder}))


  return (
    <div className={"orderList"}>
      <h2>Мои заказы</h2>
      <table className="order_table">
        <thead>
          <td>Дата</td>
          <td>Время</td>
          <td>Цена</td>
          <td>Водитель</td>
        </thead>
        <tbody>
          <td>{currentOrder?.numberDay}</td>
          <td>{currentOrder?.time}</td>
          <td>9 руб</td>
          <td>{currentOrder?.taxiDriver.carMake}</td>
        </tbody>

      </table>
    </div>
  );
};

export default MyOrder;