import React from 'react';
import NavButton from "./NavButton/NavButton";
import '../../scss/Nav.scss'
import {useDispatch} from "react-redux";
import {exitPage} from "../../redux/actions/auth";
const Nav = () => {
  const dispatch = useDispatch()
  const nameButton  = ['Мои заказы', 'Выход']
  const buttonIcon = [<span className="material-icons">
alarm
</span>, <span className="material-icons">
power_settings_new
</span> ]
  const onClick = [null, () => dispatch(exitPage())]
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