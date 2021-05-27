import React, {useState} from 'react';
import '../../scss/NumberPlace.scss'
const NumberPlace = () => {
  const arr = [1,2,3]
  const [items, setItem] = useState(0)
  return (
    <div className="number-place">
      <h2>Места</h2>
      <div className="button-selected">
        {arr.map((item, index) =>(
          // <button className="number-place-button button selected">1</button>
          <button
            className={index === items ? "number-place-button button selected" : 'number-place-button button' }
            onClick={() => setItem(index) }
          >{item}</button>
        ))}
        {/*<button className="number-place-button button">2</button>*/}
        {/*<button className="number-place-button button">3</button>*/}
      </div>
    </div>
  );
};

export default NumberPlace;