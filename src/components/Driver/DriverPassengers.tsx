import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {RootState} from "../../redux/reducers/rootReducer";

const DriverPassengers = () => {
  const dispatch = useDispatch()

  const [date, comeDate] = useParams<any>()?.date.split('-')
  console.log(date, ' ', comeDate)
  const {arr}: any = useSelector<RootState>(state => ({arr: state.driver.pass}))
  const passengersArr = arr.filter((item: any, index: any) => {
    return (item.time === comeDate) && (item.date == date)
  })


  return (
    <div>
      <h2>Текущие заказы</h2>
      {passengersArr && passengersArr.map((item: any) => {
        return (<div className="driverPassenger-block">
          <h2>Время отправления {item.time}</h2>
          {item.passengers.map((phone: any) => (
            <div className="block-user">
              {phone}
              <button className="but">Подтвердить</button>
            </div>
          ))}
          <h3>Всего пассажиров: {passengersArr[0].passengers.length}</h3>
          <Link to={'/myorder'}><button className="but">Назад</button></Link>
        </div>)
      })}

    </div>
  );

};

export default DriverPassengers;