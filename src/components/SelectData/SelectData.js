import React, {useState} from 'react';
import '../../scss/SelectData.scss'
const SelectData = () => {
  const daysOfWeek = ['Пн', 'Вт','Ср','Чт','Пт','Сб','Вс']
  const days = new Array(30).fill('')
  console.log(days)
  const [active, setActive] = useState(5)
  return (
    <div className="select-data">
      <h2 className="select-data-title">Дата</h2>
      <div className="calendar">
        <h4 className='month'>Май</h4>
        <div className="calendar-days">
          {daysOfWeek.map((item, index) => {
            return <div key={index} className="day no-selected">{item}</div>
          })}
          {days.map((item, index) => (
            <div key={index} className={active === index ? "day active" : "day"} onClick={() => {setActive(index)}}>{index+1}</div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default SelectData;