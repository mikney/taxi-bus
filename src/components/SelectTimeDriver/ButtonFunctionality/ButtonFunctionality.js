import React, {useState} from 'react';
import WifiIcon from "@material-ui/icons/Wifi";
import {Transition} from "react-transition-group";

const ButtonFunctionality = ({icon, text, index, fn, show}) => {
  // const [show, setShow] = useState(false)
  return (
    <div className={'button-functionalityn'} onClick={() => fn(index)}>
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