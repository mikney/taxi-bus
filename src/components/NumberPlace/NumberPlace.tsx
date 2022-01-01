import React, {useState} from 'react';
import '../../scss/NumberPlace.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {SetNumberOfPassengers} from "../../redux/reducers/currentValue";
const NumberPlace = () => {
  const arr = [1,2,3]
  const [items, setItem] = useState(0)
  const dispatch = useDispatch()

  const {number}: any = useSelector<RootState>(state => ({
    number: state.value.passengersCounter
  }))
  return (
    <div className="number-place">
      <h2>Места</h2>
      <div className="button-selected">
        {arr.map((item, index) =>(
          // <button className="number-place-button button selected">1</button>
          <button
            className={item === number ? "number-place-button button selected" : 'number-place-button button' }
            onClick={() => dispatch(SetNumberOfPassengers(item)) }
          >{item}</button>
        ))}
        {/*<button className="number-place-button button">2</button>*/}
        {/*<button className="number-place-button button">3</button>*/}
      </div>
    </div>
  );
};

export default NumberPlace;