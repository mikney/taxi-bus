import React, {FC, useState} from 'react';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ButtonFunctionality from "../components/SelectTimeDriver/ButtonFunctionality/ButtonFunctionality";
import PowerIcon from "@material-ui/icons/Power";
import WifiIcon from "@material-ui/icons/Wifi";
import TvIcon from "@material-ui/icons/Tv";
import img from "../1926a3d1e5eb9970e0fa210c142b97a9.jpg";
import {useDispatch, useSelector} from "react-redux";
import {sendPassenger} from "../redux/actions/taxi";
import {RootState} from "../redux/reducers/rootReducer";

interface PlaceOrderI {
  show: any
  setShow: any
}

function timeToConvert(time: string) {
  let [hours, minutes]: any = time.split(':')
  if (+minutes + 40 > 60) {
    hours = +hours + 2
    minutes = +minutes + 10
  }
  return `${hours}:${minutes}`
}

function getWeekDay(date: any) {
  const weekDay = new Date(2021, 11, date).getDay() - 1
  console.log(weekDay)
  switch (weekDay) {
    case 1: return 'ПН'
    case 2: return 'ВТ'
    case 3: return 'СР'
    case 4: return 'ЧТ'
    case 5: return 'ПТ'
    case 6: return 'СБ'
    case 0: return 'ВС'
  }

}

const PlaceOrder: FC<PlaceOrderI> = ({show, setShow}) => {


  const [hide, setHide] = useState(null)
  const {numberPassengers, from, time, date, passenger, driverName, carMake, numberDay, carPhoto, wifi, tv, v220, avatar, carColor, transporter, number, phoneNumber}: any = useSelector<RootState>((state) => ({
    time: state.taxi.currentTaxi.time,
    date: state.taxi.currentTaxi.date,
    driverName: state.taxi.currentTaxi.driverName,
    carMake: state.taxi.currentTaxi.carMake,
    carPhoto: state.taxi.currentTaxi.carPhoto,
    tv: state.taxi.currentTaxi.tv,
    v220: state.taxi.currentTaxi.v220,
    wifi: state.taxi.currentTaxi.wifi,
    avatar: state.taxi.currentTaxi.avatar,
    carColor: state.taxi.currentTaxi.carColor,
    transporter: state.taxi.currentTaxi.transporter,
    number: state.taxi.currentTaxi.number,
    phoneNumber: state.taxi.currentTaxi.driverPhone,
    numberPassengers: state.value.passengersCounter,
    from: state.value.from
  }))


  const arr = [
    [<PowerIcon className={"button-icon"}/>, `Розетка: ${v220 ? 'есть' : 'нет'}`, v220],
    [<WifiIcon className={"button-icon"}/>, `Wifi: ${wifi ? 'есть' : 'нет'}`, wifi],
    [<TvIcon className={"button-icon"}/>, `Телевизор: ${tv ? 'есть' : 'нет'}`, tv]
  ]

  const FunctionalityFn = (index: any) => {
    if (index === hide) {
      setHide(null)
    } else {
      setHide(index)
    }

  }
  const dispatch = useDispatch()

  const buttonHandler = () => {
    setShow(null)
    dispatch(sendPassenger())
  }

  return (
    <div className="order_page">
      <div className="information_transfer">
        <div className="date">
          {getWeekDay(date.date)}, <strong>{date.date} {date.month} 2021</strong>
        </div>
        <div className="from-into">
          <div style={{marginRight: "8px" }}>
            <div>{from}</div>
            <div className="time" style={{textAlign: "right"}}>{time}</div>
          </div>
          <ArrowRightAltIcon className={'arrow'}/>
          <div>
            <div style={{marginLeft: "8px" }}>{from === "Минск" ? "Барановичи" : "Минск"}</div>
            <div className="time">{timeToConvert(time)}</div>
          </div>
        </div>
        <hr style={{borderColor: "yellow", transform: "translateY(47px)"}}/>
        <div className="number-seats">
          <div>
            <div>Мест</div>
            <div style={{fontSize: '28px', paddingTop: '7px'}}>{numberPassengers}</div>
          </div>
          <div>
            <div>Стоимость</div>
            <div style={{fontSize: '28px', paddingTop: '7px'}}>{numberPassengers * 9} руб.</div>
          </div>
        </div>
      </div>
      <div className="driver-block">
          <div className='express-baranovici'>Барановичи эксресс</div>
          <div className="driver-inf">
            <img className="driver-photo" src={avatar} alt=""/>
            <div>
              <div><strong>{driverName} +{phoneNumber}</strong></div>
              <div className={`car-name `}>{carMake}, {number}</div>
              <div>Цвет {carColor}</div>
            </div>
          </div>
          <div className={'add-function'}>
            {arr.map((item, index) => (
              <ButtonFunctionality
                icon={item[0]}
                text={item[1]}
                index={index}
                fn={FunctionalityFn}
                show={hide === index}
                isExist={item[2]}
              />
            ))}
        </div>
      </div>
      <textarea className={'comment-area'}  placeholder={'Комментарий к заказу'} />
      <div className="buttons">
        <button className={"control-button"} onClick={() => setShow(null)}>Отменить</button>
        <button className={"control-button"} onClick={() => buttonHandler()}>Подтвердить</button>
      </div>
    </div>
  );
};

export default PlaceOrder;