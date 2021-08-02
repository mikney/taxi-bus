import React from 'react';
import NavButton from "./NavButton/NavButton";
import '../../scss/Nav.scss'
import {useDispatch, useSelector} from "react-redux";
import {exitPage} from "../../redux/actions/auth";
import { useHistory } from "react-router-dom";

const Nav = ({setShow, show}) => {
  const dispatch = useDispatch()
  const nameButton  = ['Мои заказы', 'Выход']
  const buttonIcon = [<span className="material-icons">
alarm
</span>, <span className="material-icons">
power_settings_new
</span> ]
  const {role} = useSelector(state => ({role: state.auth.currentUser.role}))
  let history = useHistory();

  function handleClick() {
    history.push("/home/");
  }

  function myOrderHandler() {
    if(role) {
      return () => history.push("/myorder")
    } else {
      return () => show === 'myorder' ? setShow(null): setShow('myorder')
    }
  }
  //const onClick = [() => show === 'myorder' ? setShow(null) : setShow('myorder'), () => dispatch(exitPage())]
  const onClick = [myOrderHandler(), () => dispatch(exitPage())]
  return (
    <div className="nav">
      {nameButton.map( (_,index) => {
        return <NavButton
          key={index + nameButton[index] }
          name={nameButton[index]}
          icon={buttonIcon[index]}
          func ={onClick[index]}
        />
      })}
    </div>
  );
};

export default Nav;