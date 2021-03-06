import React from 'react';
import NavButton from "./NavButton/NavButton";
import '../../scss/Nav.scss'
import {useDispatch, useSelector} from "react-redux";
import {exitPage} from "../../redux/actions/auth";
import AlarmIcon from '@mui/icons-material/Alarm';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {RootState} from "../../redux/reducers/rootReducer";
import {useHistory} from "react-router-dom";

const Nav = ({setShow, show, tabs}: any) => {
  const dispatch = useDispatch()
  const nameButton  = ['Мои заказы', 'Выход']
  const buttonIcon = [<AlarmIcon />, <PowerSettingsNewIcon />]
  const {role}: any = useSelector<RootState>(state => ({role: state.auth.currentUser.role}))
  let history = useHistory();


  function myOrderHandler() {
    if (role === 3) {
      return () => setShow('listaccount')
    }
    if(role !== 2) {
      return () => history.push("/myorder")
    } else if (role === 2) {
      return () => setShow('myorder')
    }
  }
  const onClick = [myOrderHandler(), () => dispatch(exitPage())]
  return (
    <div className="nav">
      {tabs.map( (tab: any,index: any) => {
        return <NavButton
          key={index + nameButton[index] }
          name={tab}
          icon={buttonIcon[index]}
          func ={onClick[index]}
        />
      })}
    </div>
  );
};

export default Nav;