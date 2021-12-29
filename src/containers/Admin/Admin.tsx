import React, {FC, useState} from 'react';
import axios from "axios";
import {newMessage} from "../../redux/reducers/auth";
import {useDispatch} from "react-redux";

const Admin: FC = () => {

  const dispatch = useDispatch()


  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const createDriver = async () => {

    if (phone.length !== 12) {
      dispatch(newMessage('Номер телофона должен содержать 12 символов'))
      return;
    } else if (password.length < 6) {
      dispatch(newMessage('Пароль должен содежать минимум 6 символов'))
      return;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i.test(password)) {
      dispatch(newMessage('Пароль должен содержать минимум одну букву и одну цифру'))
      return
    }

    const resp = await axios.post("http://localhost:5002/api/taxi/create", {
      phone: phone,
      password,
      role: 2
    })
    dispatch((newMessage("Пользователь был создан")))
    setPhone('')
    setPassword('')
  }

  return (
    <div>
      <h2>ADMIN</h2>
      <h3>Добавить нового водителя</h3>
      <div className={"Auth form"}>
        <label className='label' htmlFor='tel'>номер мобильного телефона:</label>
        <div className="input-tel">
          <span>+</span>
          <input className='input tel'  id={'tel'} type="text" value={phone} placeholder={'номер телефона'} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <label className={'label'} htmlFor={'pass'}>пароль:</label>
        <input className={"input" } placeholder={'Введите пароль'}  id={'pass'} type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button className={"button-auth"} onClick={createDriver}>
          Создать аккуант
        </button>
      </div>

    </div>
  );
};

export default Admin;