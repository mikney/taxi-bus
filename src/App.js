import './App.css';
import React, {useEffect} from 'react'
import HomePage from "./containers/HomePage/HomePage";
import Auth from "./containers/Auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import {reAuth} from "./redux/actions/auth";
function App() {
  const {isLogin} = useSelector(state => ({isLogin: state.auth.isLogin}))
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(reAuth())
  }, [])

  return (
    <React.Fragment>
      {isLogin ? <HomePage /> : <Auth />}
    </React.Fragment>
    )
}

export default App;
