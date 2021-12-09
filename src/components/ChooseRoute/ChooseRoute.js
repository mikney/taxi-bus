import React, {useState} from 'react';
import '../../scss/ChooseRoute.scss'
import CachedIcon from '@material-ui/icons/Cached';
import {useDispatch} from "react-redux";
import {SetFrom} from "../../redux/reducers/currentValue";
const ChooseRoute = () => {
  const [anim, setAnim] = useState('')
  const [change, setChange] = useState(['Барановичи', 'Минск'])
  let arr = ['Барановичи', 'Минск']
  function animIcon() {
    setChange(change.reverse())
    if(anim === '') {
      setAnim('anim-icon')
      setTimeout(() => setAnim(''),500)
      routeChange()
    }
  }
  const [from, setFrom] = useState('Барановичи')
  const [to, setTo] = useState('Минск')

  console.log(arr)

  const dispatch = useDispatch()

  function routeChange() {
    if (from === 'Барановичи') {
      setFrom('Минск')
      dispatch(SetFrom('Минск'))
      setTo('Барановичи')
    } else {
      setFrom('Барановичи')
      dispatch(SetFrom('Барановичи'))
      setTo('Минск')
    }
  }

  return (
    <div className="choose-route">
      <h2 className="choose-route-title">Маршрут</h2>
      <div className="select-route">
        <select value={from} onChange={() => routeChange()} className="select-option">
          <option>{change[0]}</option>
          <option>{change[1]}</option>
        </select>
        <button  onClick={animIcon} className="select-option button">
          <CachedIcon className={anim}/>
        </button>
        <select value={to} onChange={() => routeChange()} className="select-option">
          <option>{change[1]}</option>
          <option>{change[0]}</option>
        </select>
      </div>
    </div>
  );
};

export default ChooseRoute;