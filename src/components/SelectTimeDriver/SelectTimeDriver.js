import React, {useState} from 'react';

import { Transition } from 'react-transition-group';


import AccordionItem from "./AccordionItem/AccordionItem";
import {useSelector} from "react-redux";



const SelectTimeDriver = ({show: showPage, setShow:setShowPage}) => {

  const [show, setShow] = useState(null)
  const [anim, setAnim] = useState(['place-order-title',2])
  const currentDate = useSelector(state => (state.taxi.currentDate))
  const fn = (index) => {

    if (index === show) {
      setShow(null)
      clearTimeout(anim[1])
    } else {
      clearTimeout(anim[1])
      animInterval()
      setShow(index)
    }
  }

  const animInterval = () => {
    let stop = setInterval(() => {
      setAnim(['place-order-title active', stop])
      setTimeout(() => setAnim(['place-order-title', stop]), 2900)
    }, 3000)
    setAnim(['place-order-title active', stop])
    // return stop
  }

  const arr = [1,2, 3,4, 5]
  return (
    <div className="select-time-driver" >
      <h2>Время отправления</h2>
      {currentDate[0]?.time ? currentDate.map((elem, index) => (
        <AccordionItem
          numberDay={elem.numberDay}
          time={elem.time}
          numpass={elem.numPass}
          driverName={elem.taxiDriver.name}
          carMake={elem.taxiDriver.carMake}
          shown={index === show}
          index={index}
          fn={fn}
        />

      ))
        : <div>По вашему запросу нету свободных местт</div>
      }
      <Transition
        in={show !== null}
        unmountOnExit
        timeout={220}
        // mountOnEnter
      >
        {state => (
          <div onClick={() => showPage === 'placeorder' ? setShowPage(null) : setShowPage('placeorder')} className={`place-order ${state}`}>
            <div className={anim[0]}>оформить заказ</div>
          </div>
        )
        }
      </Transition>
    </div>

  )
};

export default SelectTimeDriver;