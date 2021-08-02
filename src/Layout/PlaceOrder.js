import React, {useState} from 'react';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ButtonFunctionality from "../components/SelectTimeDriver/ButtonFunctionality/ButtonFunctionality";
import PowerIcon from "@material-ui/icons/Power";
import WifiIcon from "@material-ui/icons/Wifi";
import TvIcon from "@material-ui/icons/Tv";
import img from "../1926a3d1e5eb9970e0fa210c142b97a9.jpg";
import {useDispatch} from "react-redux";
import {sendPassenger} from "../redux/actions/taxi";
const PlaceOrder = ({show, setShow}) => {


  const arr = [
    [<PowerIcon className={"button-icon"}/>, 'Розетка: Есть'],
    [<WifiIcon className={"button-icon"}/>, 'Wifi: Есть'],
    [<TvIcon className={"button-icon"}/>, 'Телевизор: Есть']
  ]
  const [hide, setHide] = useState(null)
  const FunctionalityFn = (index) => {
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
          ВТ, <strong>18.03.2021</strong>
        </div>
        <div className="from-into">
          <div style={{marginRight: "8px" }}>
            <div>Барановичи</div>
            <div className="time" style={{textAlign: "right"}}>5:30</div>
          </div>
          <ArrowRightAltIcon className={'arrow'}/>
          <div>
            <div style={{marginLeft: "8px" }}>Минск</div>
            <div className="time">7:10</div>
          </div>
        </div>
        <hr style={{tranform: "translateY(47px)", borderColor: "yellow"}}/>
        <div className="number-seats">
          <div>
            <div>Мест</div>
            <div style={{fontSize: '28px', paddingTop: '7px'}}>1</div>
          </div>
          <div>
            <div>Стоимость</div>
            <div style={{fontSize: '28px', paddingTop: '7px'}}>9 руб.</div>
          </div>
        </div>
      </div>
      <div className="driver-block">
          <div className='express-baranovici'>Барановичи эксресс</div>
          <div className="driver-inf">
            <img className="driver-photo" src={img} alt=""/>
            <div>
              <div><strong>Гена +37529552729347</strong></div>
              <div className={`car-name `}>Mercedes, 9046</div>
              <div>Цвет булый</div>
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
              />
            ))}
        </div>
      </div>
      <textarea className={'comment-area'}  placeholder={'Комментарий к заказу'} />
      <div className="buttons">
        <button onClick={() => buttonHandler()}>Подтвердить</button>
        <button onClick={() => setShow(null)}>Отменить</button>
      </div>
    </div>
  );
};

export default PlaceOrder;