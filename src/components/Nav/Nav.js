import React from 'react';
import NavButton from "./NavButton/NavButton";
import '../../scss/Nav.scss'
const Nav = () => {
  const nameButton  = ['Мои заказы', 'Выход']
  const buttonIcon = [<span className="material-icons">
alarm
</span>, <span className="material-icons">
power_settings_new
</span> ]
  return (
    <div className="nav">
      {nameButton.map( (_,index) => {
        return <NavButton
          key={index + nameButton[index] }
          name={nameButton[index]}
          icon={buttonIcon[index]}
        />
      })}
    </div>
  );
};

export default Nav;