import React from 'react';
import '../../../scss/NavButton.scss'
const NavButton = (props) => {
  console.log(props)
  return (
    <div className="nav-button">
      <div className="items-button">
        {props.icon}
        {props.name}
      </div>
    </div>
  );
};

export default NavButton;