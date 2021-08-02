import React from 'react'
import '../../scss/UserInfo.scss'
import icon from '../../icon_profil.png'
import {useSelector} from "react-redux";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function UserInfo() {
  const {userName, phoneNumber} = useSelector(state => ({
    userName: state.auth.currentUser.userName || 'Not name',
    phoneNumber: state.auth.currentUser.email
  }))
  return (
    <div className="header">
      <img className="img-icon" src={icon} alt=""/>
      <div className="user-info">
        <div className="user-info-name">
          <div className="user-name">{userName}</div>
          <button className="change_name"><AddCircleOutlineIcon /></button>
        </div>
        <div className="user-info-number">+{phoneNumber}</div>
      </div>
    </div>
  )
}