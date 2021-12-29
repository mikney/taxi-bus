import React, {useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {auth, createUser, sendEmailVeriff} from "../../redux/actions/auth";
import {RootState} from "../../redux/reducers/rootReducer";
import {newMessage} from "../../redux/reducers/auth";

const Auth = () => {
  const [num, setNum] = useState<string>('375')
  const [pass, setPass] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [isLongExpire, setLongExpired] = useState<boolean>(false)
  const dispatch = useDispatch()
  const {text, isRegistration, waitingCode}: any = useSelector<RootState>(state => ({
    text: state.auth.text,
    isRegistration: state.auth.isRegistration,
    waitingCode: state.auth.waitingCode
  }))


  function loginAuth(phoneNum: any, password: any) {
    if (phoneNum.length !== 12) {
      dispatch(newMessage('Номер телофона должен содержать 12 символов'))
      return;
    } else if (password.length < 6) {
      dispatch(newMessage('Пароль должен содежать минимум 6 символов'))
      return;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i.test(password)) {
      dispatch(newMessage('Пароль должен содержать минимум одну букву и одну цифру'))
      return
    }
      dispatch(auth(phoneNum, password, isLongExpire))
  }

  function sendEmailHandler(email: string) {
    if (/^\S+@\S+\.\S+$/i.test(email)) {
      dispatch(sendEmailVeriff(email))
    } else {
      dispatch(newMessage('Не валидиное название почты'))
    }
  }

  return (
    <>
      {!isRegistration && <div className='Auth'>
        <h2>АВТОРИЗАЦИЯ/РЕГИСТРАЦИЯ</h2>
        <div className='form'>
          <label className='label' htmlFor='tel'>номер мобильного телефона:</label>
          <div className="input-tel">
            <span>+</span>
            <input className='input tel' id={'tel'} onChange={e => {
              setNum(e.target.value)
            }} value={num} type="text" name='name' placeholder={'номер телефона'}/>
          </div>
          <label className={'label'} htmlFor={'pass'}>пароль:</label>
          <input className={'input'} id={'pass'} value={pass} onChange={e => setPass(e.target.value)} type="password"
                 name='name' placeholder={'Введите пароль'}/>
          <input type="checkbox" onChange={(event => setLongExpired(event.target.checked))} className={'checkbox'}
                 id={'checkbox'}/>
          <label htmlFor="checkbox">Запомнить меня на сайте</label>
          <button className={'button-auth'} onClick={() => loginAuth(num, pass)}>ВХОД/РЕГИТСРАЦИЯ</button>
        </div>
      </div>
      }
      {isRegistration && <div className='Auth'>
        <div className='registration'>
          <h2>РЕГИСТРАЦИЯ</h2>
          <div className='form'>
            {!waitingCode ?
              <>
                <label className='label' htmlFor='email'>Почта:</label>
                <input className='input' id='pass' value={email} onChange={e => setEmail(e.target.value)} type="email"
                       name='name' placeholder={'durov@gmail.com'}/>
                <button className={'button-auth'} onClick={() => sendEmailHandler(email)}>ОТРПАВИТЬ КОД НА ПОЧТУ ДЛЯ ПОДТВЕРЖДЕНИЯ</button>
              </>
              :
              <>
                <label className='label' htmlFor='email'>Введите полученный код:</label>
                <input className='input' id='pass' value={code} onChange={e => setCode(e.target.value)} type="number"
                       name='name' placeholder={'242591'}/>
                <button className={'button-auth'} onClick={() => dispatch(createUser(num, pass, code))}>Подтвердить</button>
              </>
            }
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default Auth;