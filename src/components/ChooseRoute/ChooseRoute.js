import React, {useState} from 'react';
import '../../scss/ChooseRoute.scss'
import CachedIcon from '@material-ui/icons/Cached';
const ChooseRoute = () => {
  const [anim, setAnim] = useState('')
  const [change, setChange] = useState(['Барановичи', 'Минск'])
  let arr = ['Барановичи', 'Минск']
  function animIcon() {
    setChange(change.reverse())
    if(anim === '') {
      setAnim('anim-icon')
      setTimeout(() => setAnim(''),500)
    }
  }

  console.log(arr)
  return (
    <div className="choose-route">
      <h2 className="choose-route-title">Маршрут</h2>
      <div className="select-route">
        <select className="select-option">
          <option>{change[0]}</option>
          <option>{change[1]}</option>
        </select>
        <button  onClick={animIcon} className="select-option button">
          <CachedIcon className={anim}/>
        </button>
        <select className="select-option">
          <option>{change[1]}</option>
          <option>{change[0]}</option>
        </select>
      </div>
    </div>
  );
};

export default ChooseRoute;