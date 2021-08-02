import React, {useEffect, useMemo, useState} from 'react';
import img from "../../1926a3d1e5eb9970e0fa210c142b97a9.jpg";
import {Transition} from "react-transition-group";
import {toInterval} from "../../Util/Util";
import {useHistory, useParams} from "react-router-dom";

const CurrentOrderDriver = ({time: comeDate, date, passengers}) => {
  const style = () => { if(passengers.length > 6) { return {transform: "translateX(-270%)"}}}
  console.log('RABOTARET')
  const [time, setTime] = useState(0)

  const timer = () => {
    let newDate = new Date("2021-07-07T12:59:20")
    const int = setInterval(()=> {
      toInterval(Math.floor((newDate - Date.now())/1000), setTime)
      if (Math.floor((newDate - Date.now())/1000) <= 0) {
        clearInterval(int)
      }
    }, 1000)
  }
  // useMemo(timer, [time])
  useEffect(timer, [])

  const history = useHistory()

  const newLink = () => {
    history.push(`/taxi/${date}-${comeDate}`)
  }
  // const d = useParams()
  // console.log(d)
  return (
    <div className='currentOrderDriver'>
      <h3>{date}.07</h3>
      <div onClick={newLink} className={'time-driver-item driver' }>
        <div className="time">{comeDate}</div>
        {/*<div className="passengers-counter"><circle className={'circle'} cx={50} cy={21}/> </div>*/}
        <svg  width="40" height="40" >
          <g
            fill="none"
          >
            <circle  r="16" cx="20" cy="20"
                     stroke={"#eee"}
                     strokeWidth="4"
                     transform="rotate(-90deg)"
            />
            <circle r="16" cx="20" cy="20"
                    stroke={"#e5e509"}
                    strokeWidth="4"
              // strokeDasharray="100 100"
                    strokeDasharray={`${(12) * 100} 100`}
                    transform="rotate(-90deg)"
            />
          </g>
        </svg>
        <div style={style()} className={"passengers-counter"}>{16 - passengers.length}</div>
        <div style={{marginLeft: '100px'}}>{time}</div>
      </div>
    </div>
  );
};

export default CurrentOrderDriver;