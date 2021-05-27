import React from 'react'
import '../../scss/UserInfo.scss'
import icon from '../../icon_profil.png'

export default function UserInfo() {
  return (
    <div className="header">
      <img className="img-icon" src={icon} alt=""/>
      <div className="user-info">
        <div className="user-info-name">Павел</div>
        <div className="user-info-number">+375 (29) 528-02-87</div>
      </div>
    </div>
  )
}