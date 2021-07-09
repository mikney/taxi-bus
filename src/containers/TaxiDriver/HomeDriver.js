import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {Route, Switch, Redirect} from 'react-router-dom'
import CurrentOrderDriver from "../../components/Driver/CurrentOrderDriver";
import axios from "axios";
import DriverPassengers from "../../components/Driver/DriverPassengers";
import {useDispatch, useSelector} from "react-redux";
import {getPass} from "../../redux/actions/driver";


const HomeDriver = () => {

  const dispatch = useDispatch()
  // const getPass = async () => {
  //   try {
  //     console.log('<<<<<<:::USED:::::>>>>>>')
  //     const resp = await axios.post('http://localhost:5002/api/taxi/pdriver', {driver: "60d477b4afc3e22514f35513"})
  //     setState(resp.data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // };

  // const [state, setState] = useState(null)
  // console.log('STATTT  ',state)
  React.useEffect(()=> { dispatch(getPass())},[])
  const {state} = useSelector(state => ({state: state.driver.pass}))
  return (
    <>

      {state && state.map((item, index) => {
        return <CurrentOrderDriver
          key={index}
          time={item.time}
          date={item.date}
          passengers={item.passengers}
        />
      })}
      {/*<Route path={'/ll'} component={<DriverPassengers state={state} /> }/>*/}
      <Link to={'/'}><button>Назад</button></Link>
    </>
  );
};

// <div className='home-driver'>
//   <Switch>
//     {/*<Route path='/auth' component={Auth} />*/}
//     <Route path='/quiz-creator' component={QuizCreator} />
//     <Route path='/quiz/:id' component={Quiz} />
//     <Route path='/logout' component={Logout}/>
//     <Route path='/' exact component={QuizList} />
//     <Redirect to={'/'}/>
//   </Switch>
// </div>
export default HomeDriver;