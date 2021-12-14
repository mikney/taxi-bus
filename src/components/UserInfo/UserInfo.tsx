import React, {MutableRefObject, useRef, useState} from 'react'
import '../../scss/UserInfo.scss'
import icon from '../../icon_profil.png'
import {useDispatch, useSelector} from "react-redux";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {RootState} from "../../redux/reducers/rootReducer";
import {Dispatch} from "redux";
import {AuthAction, AuthActionTypes} from "../types/auth";
import {changeName} from "../../redux/actions/auth";
import {newMessage} from "../../redux/reducers/auth";

export default function UserInfo() {
  const {userName, phoneNumber} : any = useSelector<RootState>(state => ({
    userName: state.auth.currentUser.userName || 'Not name',
    phoneNumber: state.auth.currentUser.email
  }))


  const divUserName = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const dispatch = useDispatch()

  const [userNameState, setUserName] = useState<string>(userName)
  const [isChangeName, setChangeName] = useState<boolean>(false)

  const changeNameHandler = () => {
    setChangeName(true)
    if (isChangeName) {
      if(userNameState.length === 0 || userNameState.length >= 10) {
        dispatch(newMessage(userNameState.length >= 10 ? 'Имя должно быть не больше 10 символов' :'Поле не должно быть пустым'))
        return
      }
      dispatch(changeName(userNameState))
      setChangeName(false)

    }
  }


  return (
    <div className="header">
      <img className="img-icon" src={icon} alt=""/>
      <div className="user-info">
        <div className="user-info-name">

          {!isChangeName ?
            <>
            <div className="user-name">{userName}</div>
            </>
            :
            <input ref={divUserName} className="user-input" value={userNameState} onChange={(e) => setUserName(e.target.value)} type="text"/>
          }
          <button className="change_name" onClick={() => changeNameHandler()}>
            {!isChangeName ?
              <img
                src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/30/000000/external-edit-miscellaneous-kiranshastry-lineal-kiranshastry.png"/>
              :
              <img src="https://img.icons8.com/ios/26/000000/checked--v1.png"/>
            }
          </button>
          {isChangeName ?
            <button className="change_name" onClick={() => setChangeName(false)}>
              <img src="https://img.icons8.com/ios/26/000000/cancel.png"/>
            </button>
            :
            null
          }
        </div>
        <div onChange={() => null} className="user-info-number">+{phoneNumber}</div>

      </div>
    </div>
  )
}