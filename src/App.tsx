import './App.css';
import React, {useEffect} from 'react'
import HomePage from "./containers/HomePage/HomePage";
import Auth from "./containers/Auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import {reAuth} from "./redux/actions/auth";
import {newMessage, setLogin} from "./redux/reducers/auth";
import ToolMessage from "./components/toolMessage/toolMessage";
import {RootState} from "./redux/reducers/rootReducer";
function App() {
  const {isLogin, message}: any  = useSelector<RootState>(state => ({isLogin: state.auth.isLogin, message: state.auth.message}))
  const dispatch = useDispatch()


  function newMessages() {
    setTimeout(() => {
      dispatch(newMessage(''))
    }, 1300)
    return <ToolMessage message={message} />
  }

  useEffect(() =>{
    if (localStorage.getItem('token')) {
      dispatch(setLogin(true))
    }
    dispatch(reAuth())
  }, [])

  return (
    <React.Fragment>
      {isLogin ? <HomePage /> : <Auth />}
      {message ? newMessages() : ''}
    </React.Fragment>
    )
}

export default App;
