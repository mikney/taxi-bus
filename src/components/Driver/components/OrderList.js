import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addDriverDate} from "../../../redux/actions/driver";

const OrderList = () => {

  const arr = ["12:00", "12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"]
  const dispatch = useDispatch()
  const {taxist, date, taxiDriver} = useSelector(state => (
    {
      taxist: state.taxi.currentDate,
      date: state.taxi.currentDay,
      taxiDriver: state.auth.currentUser.id
    }
    ))
  function f() {
    taxist.forEach(obj => {
      arr[arr.indexOf(obj.time)] = {
        time: obj.time,
        name: obj.taxiDriver.name,
        carMake: obj.taxiDriver.carMake,
      }
    })
  }
  f()
  console.log(arr)
  function f1() {
    return  arr.map(item => {
      console.log('Check typeof', item === 'object' , item)
      return  typeof item === 'object' ? ''
        : <div className="block-user">
          <div>{item}</div>
          {/*<div>*/}
          {/*  <div><strong>Alex</strong></div>*/}
          {/*  <div>Mercedes 33233</div>*/}
          {/*</div>*/}
          <button className={'but'}>Добавить</button>
        </div>
    })
  }

  return (
    <div className="order-list">
      <h2>Список заказов</h2>
      <div className="list">
        {arr.map(item => {
         return  typeof item === 'object' ? <div className="block-user">
           <div>{item.time}</div>
           <div>
             <div><strong>{item.name}</strong></div>
             <div>{item.carMake} 33233</div>
           </div>
           <button className={'but disable'}>Добавить</button>
         </div>
           : <div className="block-user">
             <div>{item}</div>
             {/*<div>*/}
             {/*  <div><strong>Alex</strong></div>*/}
             {/*  <div>Mercedes 33233</div>*/}
             {/*</div>*/}
             <button onClick={() => dispatch(addDriverDate(date, taxiDriver, item))} className={'but'}>Добавить</button>
           </div>
        })}
        {/*{f1()}*/}

      </div>
    </div>
  );
};

export default OrderList;