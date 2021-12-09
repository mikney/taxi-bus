import React, {useEffect, useReducer, useState} from 'react';
import '../../scss/SelectData.scss'
import {getTaxi} from "../../redux/actions/taxi";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {Calendar} from "../../Util/Util";
import {RootState} from "../../redux/reducers/rootReducer";

type monthLiteral = 'Январь' | "Февраль" | 'Март' | 'Апрель' | 'Май' | 'Июнь' | 'Июль' | 'Август' | 'Сентябрь' | 'Октябрь' | 'Ноябрь' | 'Декабрь'
const months = ['Январь', "Февраль", 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const SelectData = (props: any) => {
  const daysOfWeek = ['Пн', 'Вт','Ср','Чт','Пт','Сб','Вс']
  const currentMonth = months[new Date().getMonth()]
  console.log(currentMonth)
  const days: any = Calendar()
  console.log(days)

  const currentDay = new Date().getDate()
  const [active, setActive] = useState(currentDay)
  const dispatch = useDispatch()

  const {from}: any = useSelector<RootState>(state => ({
    from: state.value.from
  }))
  const setDate = (index: any, e: any, month: monthLiteral) => {
    if (e.target.classList[1] === "no-selected") {
      return null
    }
    console.log(e.target.classList[1] === "no-selected")
    setActive(index)
    if (!props.role) {
      dispatch(getTaxi(index, month, from))
    }
    dispatch(getTaxi(index, month, from))
  }
  React.useEffect(() => {
    console.log(active)
    dispatch(getTaxi(active, currentMonth, from))
  }, [from])


  const classes = (() =>  {
    let check = true
    return function (item: any, index: any) {
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


  return (
    <div className="select-data">
      <h2 className="select-data-title">Дата</h2>
      <div className="calendar">
        {(Object.keys(days) as Array<monthLiteral>).map((month, index) => {
          return (
            <>
              <h4 className='month'>{month}</h4>
              <div className="calendar-days">
                {days[month].map((item: any, indexx: any) => (
                  <>
                    {(index === 0 && indexx === 0) && daysOfWeek.map((item, index) => {
                      return <div key={index} className="day no-selected">{item}</div>
                    })}
                    <div key={indexx} className={classes(item, index)} onClick={(e) => {
                      setDate(item, e, month)
                    }}>{item}</div>
                  </>
                ))}
              </div>
            </>
          )
        })}
      </div>
    </div>

  );
};

export default SelectData;