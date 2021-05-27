import React, {useState} from 'react';
import img from '../../1926a3d1e5eb9970e0fa210c142b97a9.jpg'
import { Transition } from 'react-transition-group';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CSSTransition from "react-transition-group/CSSTransition";
import PowerIcon from '@material-ui/icons/Power';
import WifiIcon from '@material-ui/icons/Wifi';
import TvIcon from '@material-ui/icons/Tv';
import ButtonFunctionality from "./ButtonFunctionality/ButtonFunctionality";
import img1 from '../../img/22c0ce645e8615b7addfedc7d8cc05a5.jpg'
import img2 from '../../img/0765c4bd699088d0e7a58128ed0a39d2.jpg'
import img3 from '../../img/3878fda59ea2348bd879985e63bd5821.jpg'
import img4 from '../../img/d09aae0b72aa2944be7044adbcfdcc0f.jpg'
import img5 from '../../img/d85078b0bab7f81f23c4e92b0a4cc5eb.jpg'
import AccordionItem from "./AccordionItem/AccordionItem";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//       fontWeight: theme.typography.fontWeightRegular,
//     },
//   }),
// );

const SelectTimeDriver = () => {
  // const accordion = () => {
  //   if(show === 'AccordionDetails active'){
  //     setShow('AccordionDetails disabled')
  //   } else {
  //     setShow('AccordionDetails active')
  //   }
  // }
  //const classes = useStyles()
  const [show, setShow] = useState(null)
  const [anim, setAnim] = useState(['place-order-title',2])
  const fn = (index) => {
    // if (index !== null) {
    // }
    if (index === show) {
      setShow(null)
      clearTimeout(anim[1])
    } else {
      clearTimeout(anim[1])
      animInterval()
      setShow(index)
    }
  }
  console.log(anim[0])
  const animInterval = () => {
    let stop = setInterval(() => {
      setAnim(['place-order-title active', stop])
      setTimeout(() => setAnim(['place-order-title', stop]), 2900)
    }, 3000)
    setAnim(['place-order-title active', stop])
    // return stop
  }
  console.log(anim)
  const arr = [1,2, 3,4, 5]
  return (
    <div className="select-time-driver" >
      <h2>Время отправления</h2>
      {arr.map((_, index) => (
        <AccordionItem
          shown={index === show}
          index={index}
          fn={fn}
        />
      ))}
      <Transition
        in={show !== null}
        unmountOnExit
        timeout={220}
        // mountOnEnter
      >
        {state => (
          <div className={`place-order ${state}`}>
            <div className={anim[0]}>оформить заказ</div>
          </div>
        )
        }
      </Transition>
      {/*{show !==null ? <div className="place-order">*/}
      {/*  <div className={anim[0]}>оформить заказ</div>*/}
      {/*</div>*/}
      {/*: ''}*/}
      {/*<div className={show ? "accordion active" : 'accordion'}>*/}
      {/*  <div onClick={() => setShow(!show)} className={show ? "time-driver-item active" : 'time-driver-item' }>*/}
      {/*    <div className="time">16:30</div>*/}
      {/*    /!*<div className="passengers-counter"><circle className={'circle'} cx={50} cy={21}/> </div>*!/*/}
      {/*    <svg  width="40" height="40">*/}
      {/*      <g*/}
      {/*         fill="none"*/}
      {/*      >*/}
      {/*        <circle  r="16" cx="20" cy="20"*/}
      {/*                 stroke="#eee"*/}
      {/*                 strokeWidth="4"*/}
      {/*                 transform="rotate(-90deg)"*/}
      {/*        />*/}
      {/*        <circle r="16" cx="20" cy="20"*/}
      {/*                stroke="#e5e509"*/}
      {/*                strokeWidth="4"*/}
      {/*                strokeDasharray="75 100"*/}
      {/*                transform="rotate(-90deg)"*/}
      {/*        />*/}
      {/*      </g>*/}
      {/*    </svg>*/}
      {/*    <div className={"passengers-counter"}>12</div>*/}
      {/*    <img className="driver-photo" src={img} alt=""/>*/}
      {/*    <div className="info-driver">*/}
      {/*      <div className="car-driver">Mercedes</div>*/}
      {/*      <div className="name-driver">Вадим скоморох</div>*/}
      {/*    </div>*/}
      {/*    <div className="price">*/}
      {/*      <div className="price-text"><span style={{fontSize: '18px'}}>9</span> руб.</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <CSSTransition*/}
      {/*    in={show}*/}
      {/*    timeout={300}*/}
      {/*    // mountOnEnter*/}
      {/*    unmountOnExit*/}
      {/*    classNames={"Acc"}*/}
      {/*  >*/}
      {/*    <React.Fragment>*/}
      {/*    <div className={"AccordionDetails"}>*/}
      {/*      <div className="acc-driver-info">*/}
      {/*        <div className="first-column">*/}
      {/*          <div className={'detail_first'}>Автомобиль:</div>*/}
      {/*          <div className={'detail_first'}>Перевозчик:</div>*/}
      {/*          <div className={'detail_first'}>Гос. номер:</div>*/}
      {/*          <div className={'detail_first'}>Цвет:</div>*/}
      {/*        </div>*/}
      {/*        <div className="second-column">*/}
      {/*          <div className={'detail_car'}>Mercedes</div>*/}
      {/*          <div className={'detail_car'}>ООО "Ваджен плюс"</div>*/}
      {/*          <div className={'detail_car'}>7035</div>*/}
      {/*          <div className={'detail_car'}>Белый</div>*/}
      {/*          </div>*/}
      {/*      </div>*/}
      {/*      <div className="add-function">*/}
      {/*        /!*<div className={functionality ? "button-functionality active" : "button-functionality"} onClick={() => setFunctionality(!functionality)}>*!/*/}
      {/*        /!*  <PowerIcon className={"button-icon"}/>*!/*/}
      {/*        /!*  /!*<div className={'addButton'}> Я вообще-то тут</div>*!/*!/*/}
      {/*        /!*  {functionality ? <div className={'addButton'}> Я вообще</div> : ''}*!/*/}
      {/*        /!*  /!*{functionality ? 'addButton active' : 'addButton'}*!/*!/*/}
      {/*        /!*</div>*!/*/}
      {/*        /!*<div className="button-functionalityn" onClick={() => setFunctionalityn(!functionalityn)}>*!/*/}
      {/*        /!*  {console.log(functionalityn)}*!/*/}
      {/*        /!*  <Transition*!/*/}
      {/*        /!*    in={functionalityn}*!/*/}
      {/*        /!*    timeout={300}*!/*/}
      {/*        /!*    className={'dada'}*!/*/}
      {/*        /!*  >*!/*/}
      {/*        /!*    {state => (*!/*/}
      {/*        /!*      <React.Fragment>*!/*/}
      {/*        /!*        <WifiIcon className={"button-icon"}/>*!/*/}
      {/*        /!*        <div className={`button-transition ${state}`}>Kto tyt</div>*!/*/}
      {/*        /!*      </React.Fragment>*!/*/}
      {/*        /!*    )}*!/*/}
      {/*        /!*  </Transition>*!/*/}
      {/*        /!*</div>*!/*/}
      {/*        /!*<div className="button-functionality">*!/*/}
      {/*        /!*  <TvIcon className={"button-icon"}/>*!/*/}
      {/*        /!*</div>*!/*/}
      {/*        <ButtonFunctionality*/}
      {/*          icon={<PowerIcon className={"button-icon"}/>}*/}
      {/*          text={'Розетка: Есть'}*/}
      {/*        />*/}
      {/*        <ButtonFunctionality*/}
      {/*          icon={<WifiIcon className={"button-icon"}/>}*/}
      {/*          text={'Wifi: Есть'}*/}
      {/*        />*/}
      {/*        <ButtonFunctionality*/}
      {/*          icon={<TvIcon className={"button-icon"}/>}*/}
      {/*          text={'Телевизор: Есть'}*/}
      {/*        />*/}

      {/*      </div>*/}
      {/*      <div className="car-photo">*/}
      {/*        <img src={img1} alt=""/>*/}
      {/*        <img src={img2} alt=""/>*/}
      {/*        <img src={img3} alt=""/>*/}
      {/*        <img src={img4} alt=""/>*/}
      {/*        <img src={img5} alt=""/>*/}
      {/*      </div>*/}
      {/*      <div className="plain-text">Официальный перевозчик. Отправление с АВТОВОКЗАЛА Барановичи платформа № 2 каждые 30 мин .Рейсы выполняются по трассе М1. Примерное время в пути 1 час и 50 минут. Водитель самостоятельно перезванивает всем пассажирам. Если водитель до Вас не смог дозвониться и Вы сами не подтвердили поездку, бронь автоматически может быть снята. Билет приобретается только у водителя в автобусе.</div>*/}
      {/*    </div>*/}
      {/*    </React.Fragment>*/}
      {/*  </CSSTransition>*/}
      {/*</div>*/}
    </div>

    //<Accordion>
    //           <AccordionSummary
    //             expandIcon={<ExpandMoreIcon />}
    //             aria-controls="panel1a-content"
    //             id="panel1a-header"
    //           >
    //             <Typography className={classes.heading}>Accordion 1</Typography>
    //           </AccordionSummary>
    //           <AccordionDetails>
    //             <Typography>
    //               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
    //               sit amet blandit leo lobortis eget.
    //             </Typography>
    //           </AccordionDetails>
    //         </Accordion>
  )
};

export default SelectTimeDriver;