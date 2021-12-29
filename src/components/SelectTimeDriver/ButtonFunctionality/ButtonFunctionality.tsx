import React, {useState} from 'react';
import WifiIcon from "@material-ui/icons/Wifi";
import {Transition} from "react-transition-group";
import classNames from "classnames";
import {FC} from "react";

interface ButtonFunctionalityI {
  icon: any
  text: any
  index: any
  fn: any
  show: any
  isExist: any
}

const ButtonFunctionality: FC<ButtonFunctionalityI> = ({icon, text, index, fn, show, isExist}) => {
  // const [show, setShow] = useState(false)
  return (
    <div className={classNames('button-functionalityn', {"disable": !isExist})} onClick={() => fn(index)}>
      {icon}
      <Transition
        in={show}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <React.Fragment>
            <div className={`button-transition ${state}`}>{text}</div>
          </React.Fragment>
        )}
      </Transition>
    </div>
  );
};

export default ButtonFunctionality;