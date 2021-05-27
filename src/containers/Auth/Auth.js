import React, {useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {testok} from "../../redux/actions/auth";

const Auth = () => {
  const [val, setVal] = useState('375')
  const dispatch = useDispatch()
  const {text} = useSelector(state => ({
    text: state.auth.text
  }))
  const testing = async () => {
    try {
      const b = {
        "username": "admin",
        "password": "admin"
      }
      const resp = await axios.get(`http://localhost:5000/auth/users`)
      const response = await axios.post(`http://localhost:5000/auth/users`, b)
      console.log(resp.data)
    } catch (e) {
      console.log(e)
    }
  }
  console.log(text)
  return (
    <div className={'Auth'}>
      <h2>АВТОРИЗАЦИЯ/РЕГИСТРАЦИЯ</h2>
      <form action={'/'} >
        <label className={'label'} htmlFor={'tel'}>номер мобильного телефона:</label>
        <div className="input-tel">
          <span>+</span>
          <input className={'input tel'}  id={'tel'} onChange={e => {setVal(e.target.value)}} value={val} type="text" name='name' placeholder={'номер телефона'}/>

        </div>
        <label className={'label'} htmlFor={'pass'}>пароль:</label>
        <input className={'input'} id={'pass'} type="password" name='name' placeholder={'Введите пароль'}/>
        <input type="checkbox" className={'checkbox'} id={'checkbox'} />
        <label htmlFor="checkbox">Запомнить меня на сайте</label>
        <button className={'button-auth'} type={"submit"} >ВХОД/РЕГИТСРАЦИЯ</button>
      </form>
      <button onClick={() => testing() }>{text}</button>
    </div>
  );
};

export default Auth;