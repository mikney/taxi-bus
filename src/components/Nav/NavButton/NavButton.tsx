import React from 'react';
import '../../../scss/NavButton.scss'
const NavButton = (props: any) => {
  return (
    <div className="nav-button" onClick={props.func}>
      <div className="items-button">
        {props.icon}
        {props.name}
      </div>
    </div>
  );
};

export default NavButton;