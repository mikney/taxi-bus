import React, {useState} from 'react';
import img from "../../../1926a3d1e5eb9970e0fa210c142b97a9.jpg";
import CSSTransition from "react-transition-group/CSSTransition";
import ButtonFunctionality from "../ButtonFunctionality/ButtonFunctionality";
import PowerIcon from "@material-ui/icons/Power";
import WifiIcon from "@material-ui/icons/Wifi";
import TvIcon from "@material-ui/icons/Tv";
import img1 from "../../../img/22c0ce645e8615b7addfedc7d8cc05a5.jpg";
import img2 from "../../../img/0765c4bd699088d0e7a58128ed0a39d2.jpg";
import img3 from "../../../img/3878fda59ea2348bd879985e63bd5821.jpg";
import img4 from "../../../img/d09aae0b72aa2944be7044adbcfdcc0f.jpg";
import img5 from "../../../img/d85078b0bab7f81f23c4e92b0a4cc5eb.jpg";
import {Transition} from "react-transition-group";
import {useDispatch} from "react-redux";
import {sendPassenger, setPassenger} from "../../../redux/actions/taxi";

const AccordionItem = ({shown: show, index, numpass, fn, time,  driverName, carMake, numberDay, carPhoto, wifi, tv, v220, avatar, carColor, transporter, number, driverPhone}) => {
  const arr = [
    [<PowerIcon className={"button-icon"}/>, `Розетка: ${v220 ? 'есть' : 'нет'}`, v220],
    [<WifiIcon className={"button-icon"}/>, `Wifi: ${wifi ? 'есть' : 'нет'}`, wifi],
    [<TvIcon className={"button-icon"}/>, `Телевизор: ${tv ? 'есть' : 'нет'}`, tv]
  ]
  const style = () => { if(numpass > 6) { return {transform: "translateX(-270%)"}}}
  const dispatch = useDispatch()
  const [hide, setHide] = useState(null)
  const FunctionalityFn = (index) => {
    if (index === hide) {
      setHide(null)
    } else {
      setHide(index)
    }

  }
  const driverShow = () => {
    fn(index)
    dispatch(setPassenger(time, driverName, carMake, numberDay, carPhoto, wifi, tv, v220, avatar, carColor, transporter, number, driverPhone))
  }
  // const [show, setShow] = useState(false)
  return (
    <div className={show ? "accordion active" : 'accordion'}>
      <div onClick={() => driverShow()} className={show ? "time-driver-item active" : 'time-driver-item' }>
        <div className="time">{time}</div>
        {/*<div className="passengers-counter"><circle className={'circle'} cx={50} cy={21}/> </div>*/}
        <svg  width="40" height="40" >
          <g
            fill="none"
          >
            <circle  r="16" cx="20" cy="20"
                     stroke={show ? "#b8b8b8" : "#eee"}
                     strokeWidth="4"
                     transform="rotate(-90deg)"
            />
            <circle r="16" cx="20" cy="20"
                    stroke={show ? '#fff' : "#e5e509"}
                    strokeWidth="4"
                    // strokeDasharray="100 100"
                    strokeDasharray={`${(1- numpass/16) * 100} 100`}
                    transform="rotate(-90deg)"
            />
          </g>
        </svg>
          <div style={style()} className={"passengers-counter"}>{16 - numpass}</div>
        <img className="driver-photo" src={avatar} alt=""/>
        <Transition
          in={show}
          timeout={150}
        >
          {state => (
            <div className="info-driver">
              <div className={`car-name ${state}`}>{carMake}</div>
              <div className={`name-driver ${state}`}>{driverName}</div>
              <div className={`hidden_block ${state}`}>Водитель</div>
            </div>
        )}
      </Transition>
        <div className="price">
          <div className="price-text"><span style={{fontSize: '18px'}}>9</span> руб.</div>
        </div>
      </div>
      <CSSTransition
        in={show}
        timeout={230}
        // mountOnEnter
        unmountOnExit
        classNames={"Acc"}
      >
        <React.Fragment>
          <div className={"AccordionDetails"}>
            <div className="acc-driver-info">
              <div className="first-column">
                <div className={'detail_first'}>Автомобиль:</div>
                <div className={'detail_first'}>Перевозчик:</div>
                <div className={'detail_first'}>Гос. номер:</div>
                <div className={'detail_first'}>Цвет:</div>
              </div>
              <div className="second-column">
                <div className={'detail_car'}>{carMake}</div>
                <div className={'detail_car'}>{transporter}</div>
                <div className={'detail_car'}>{number}</div>
                <div className={'detail_car'}>{carColor}</div>
              </div>
            </div>
            <div className="add-function">
              {/*<div className={functionality ? "button-functionality active" : "button-functionality"} onClick={() => setFunctionality(!functionality)}>*/}
              {/*  <PowerIcon className={"button-icon"}/>*/}
              {/*  /!*<div className={'addButton'}> Я вообще-то тут</div>*!/*/}
              {/*  {functionality ? <div className={'addButton'}> Я вообще</div> : ''}*/}
              {/*  /!*{functionality ? 'addButton active' : 'addButton'}*!/*/}
              {/*</div>*/}
              {/*<div className="button-functionalityn" onClick={() => setFunctionalityn(!functionalityn)}>*/}
              {/*  {console.log(functionalityn)}*/}
              {/*  <Transition*/}
              {/*    in={functionalityn}*/}
              {/*    timeout={300}*/}
              {/*    className={'dada'}*/}
              {/*  >*/}
              {/*    {state => (*/}
              {/*      <React.Fragment>*/}
              {/*        <WifiIcon className={"button-icon"}/>*/}
              {/*        <div className={`button-transition ${state}`}>Kto tyt</div>*/}
              {/*      </React.Fragment>*/}
              {/*    )}*/}
              {/*  </Transition>*/}
              {/*</div>*/}
              {/*<div className="button-functionality">*/}
              {/*  <TvIcon className={"button-icon"}/>*/}
              {/*</div>*/}
              {arr.map((item, index) => (
                <ButtonFunctionality
                  icon={item[0]}
                  text={item[1]}
                  isExist={item[2]}
                  index={index}
                  fn={FunctionalityFn}
                  show={hide === index}
                />
              ))}
              {/*<ButtonFunctionality*/}
              {/*  icon={<PowerIcon className={"button-icon"}/>}*/}
              {/*  text={'Розетка: Есть'}*/}
              {/*/>*/}
              {/*<ButtonFunctionality*/}
              {/*  icon={<WifiIcon className={"button-icon"}/>}*/}
              {/*  text={'Wifi: Есть'}*/}
              {/*/>*/}
              {/*<ButtonFunctionality*/}
              {/*  icon={<TvIcon className={"button-icon"}/>}*/}
              {/*  text={'Телевизор: Есть'}*/}
              {/*/>*/}

            </div>
            <div className="car-photo">
              {carPhoto.map((urlPhoto) => {
                return <img src={urlPhoto} alt="car-photo"/>
              })}
            </div>
            <div className="plain-text">Официальный перевозчик. Отправление с АВТОВОКЗАЛА Барановичи платформа № 2 каждые 30 мин .Рейсы выполняются по трассе М1. Примерное время в пути 1 час и 50 минут. Водитель самостоятельно перезванивает всем пассажирам. Если водитель до Вас не смог дозвониться и Вы сами не подтвердили поездку, бронь автоматически может быть снята. Билет приобретается только у водителя в автобусе.</div>
          </div>
        </React.Fragment>
      </CSSTransition>
    </div>
  );
};

export default AccordionItem;