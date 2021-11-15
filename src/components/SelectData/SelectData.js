import React, {useEffect, useState} from 'react';
import '../../scss/SelectData.scss'
import {getTaxi} from "../../redux/actions/taxi";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {Calendar} from "../../Util/Util";
const SelectData = (props) => {
  const daysOfWeek = ['Пн', 'Вт','Ср','Чт','Пт','Сб','Вс']
  const months = ['Январь', "Февраль", 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  const currentMonth = months[new Date().getMonth()]
  // console.log(Calendar());
  // const days = new Array(30).fill('')
  const days = Calendar()
  console.log(days)

  // if (days.includes(1)) {
  //   console.log(days.indexOf(1))
  //   const arr = days.slice(days.indexOf(1))
  //   console.log(arr)
  // }
  const currentDay = new Date().getDate()
  // const currentDay = useSelector(state => ({currentDay: state.taxi.currentDay}))
  const [active, setActive] = useState(currentDay)
  const dispatch = useDispatch()
  const setDate = (index, e) => {
    if (e.target.classList[1] === "no-selected") {
      return null
    }
    console.log(e.target.classList[1] === "no-selected")
    setActive(index)
    if (!props.role) {
      dispatch(getTaxi(index))
    }
    dispatch(getTaxi(index))
  }
  React.useEffect(() => {
    dispatch(getTaxi(currentDay, 'Ноябрь', 'Барановичи'))
  }, [])
  const classes = (() =>  {

    let check = true
    return function (item, index) {
      if (item === currentDay) {
        check = false
      }
      if ((index === 1) && (item === '')) {
        check =  true
      }
      if ((index === 1) && typeof item === "number") {
        check = false
      }
      return classNames('day',{
        'active': active === item && !check,
        'no-selected': check
      })
    }
  })()

  function f() {
    return(
      <div className="calendar">
        {Object.keys(days).map((month, index) => {
          return (
            <>
            <h4 className='month'>{month}</h4>
            <div className="calendar-days">
            {days[month].map((item, indexx) => (
              <>
                {(index === 0 && indexx === 0) && daysOfWeek.map((item, index) => {
                  return <div key={index} className="day no-selected">{item}</div>
                })}
                <div key={indexx} className={classes(item, index)} onClick={(e) => {
                  setDate(item, e)
                }}>{item}</div>
              </>
            ))}
            </div>
            </>
          )
        })}
      </div>
    )
  }



  return (
    <div className="select-data">
      <h2 className="select-data-title">Дата</h2>
      {f()}
      {/*<div className="calendar">*/}
      {/*  <h4 className='month'>{currentMonth}</h4>*/}
      {/*  <div className="calendar-days">*/}
      {/*    {daysOfWeek.map((item, index) => {*/}
      {/*      return <div key={index} className="day no-selected">{item}</div>*/}
      {/*    })}*/}
      {/*    {Object.keys(days).map(month => {*/}
      {/*      return (*/}
      {/*        days[month].map((item, index) => (*/}
      {/*        <React.Fragment>*/}

      {/*          <div key={index} className={classes(item)} onClick={(e) => {*/}
      {/*            setDate(item, e)*/}
      {/*          }}>{item}</div>*/}
      {/*        </React.Fragment>*/}
      {/*      )))*/}
      {/*    })}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>

  );
};

export default SelectData;