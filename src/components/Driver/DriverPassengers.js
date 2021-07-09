import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const DriverPassengers = () => {
  const dispatch = useDispatch()

  // const getPass = async () => {
  //   try {
  //     console.log('<<<<<<:::USED:::::>>>>>>')
  //     const resp = await axios.post('http://localhost:5002/api/taxi/pdriver', {driver: "60d477b4afc3e22514f35513"})
  //     setState(resp.data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // };
  //
  // const [state, setState] = useState(null)
  // console.log('STATTT  ',state)
  // React.useEffect(getPass,[])
  const [date, comeDate] = useParams()?.date.split('-')
  console.log(date, ' ', comeDate)
  const {arr} = useSelector(state => ({arr: state.driver.pass}))
  const passengersArr = arr.filter((item, index) => {
    return (item.time === comeDate) && (item.date == date)
  })


  return (
    <div>
      <h2>Текущие заказы</h2>
      {passengersArr && passengersArr.map(item => {
        return (<div className="driverPassenger-block">
          <h2>Время отправления {item.time}</h2>
          {item.passengers.map(phone => (
            <div className="block-user">
              {phone}
              <button className="but">Подтвердить</button>
            </div>
          ))}
          <h3>Всего пассажиров: {passengersArr[0].passengers.length}</h3>
          <Link to={'/'}><button className="but">Назад</button></Link>
        </div>)
      })}

    </div>
  );

};

export default DriverPassengers;