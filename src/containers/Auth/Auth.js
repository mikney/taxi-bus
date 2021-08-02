import React, {useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {auth, testok} from "../../redux/actions/auth";

const Auth = () => {
  const [num, setNum] = useState('375')
  const [pass, setPass] = useState('')
  const dispatch = useDispatch()
  const {text} = useSelector(state => ({
    text: state.auth.text
  }))

  console.log(text)
  return (
    <div className={'Auth'}>
      <h2>АВТОРИЗАЦИЯ/РЕГИСТРАЦИЯ</h2>
      <div className={'form'}  >
        <label className={'label'} htmlFor={'tel'}>номер мобильного телефона:</label>
        <div className="input-tel">
          <span>+</span>
          <input className={'input tel'}  id={'tel'} onChange={e => {setNum(e.target.value)}} value={num} type="text" name='name' placeholder={'номер телефона'}/>

        </div>
        <label className={'label'} htmlFor={'pass'}>пароль:</label>
        <input className={'input'} id={'pass'} value={pass} onChange={e => setPass(e.target.value)} type="password" name='name' placeholder={'Введите пароль'}/>
        <input type="checkbox" className={'checkbox'} id={'checkbox'}  />
        <label htmlFor="checkbox">Запомнить меня на сайте</label>
        <button className={'button-auth'} onClick={() => dispatch(auth(num, pass))} >ВХОД/РЕГИТСРАЦИЯ</button>
      </div>
    </div>
  );
};

export default Auth;