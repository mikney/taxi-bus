import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {Route, Switch, Redirect} from 'react-router-dom'
import CurrentOrderDriver from "../../components/Driver/CurrentOrderDriver";
import axios from "axios";
import DriverPassengers from "../../components/Driver/DriverPassengers";
import {useDispatch, useSelector} from "react-redux";
import {getPass} from "../../redux/actions/driver";
import {RootState} from "../../redux/reducers/rootReducer";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


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
  const {id, pass}: any = useSelector<RootState>((state) => ({
    id: state.auth.currentUser.id,
    pass: state.driver.pass
  }))

  const [passArray, setPass] = useState<any[]>([])
  const [value, setValue] = React.useState('Барановичи');


  // const [state, setState] = useState(null)
  // console.log('STATTT  ',state)
  React.useEffect(()=> { dispatch(getPass(id))},[])
  React.useEffect(() => {
    const fromPassFilter = pass.filter((item: any) => item.from === value)
    const newPassArray: any[] = []
    const month = new Set()
    const day = new Set()

    fromPassFilter.forEach((item: any) => {
      month.add(item.month)
    })
    month.forEach((month) => {
      const days = new Set()
      const months = fromPassFilter.filter((item: any) => {
        if (item.month === month) {
          days.add(item.date)
        }
       return  item.month === month
      })
      const monthArray = [...months]
      days.forEach((day) => {
        const newDayArray = monthArray.filter((item) => {
          return item.date === day
        })
        newPassArray.push({
          month: month,
          day: day,
          passengers: newDayArray
        })
      })
    })
    console.log(newPassArray)
    setPass(newPassArray)
  }, [pass, value])



  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs className="tabs"
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          aria-label="primary tabs example"
        >
          <Tab value="Барановичи" label="Барановичи"/>
          <Tab value="Минск" label="Минск" />
        </Tabs>
      </Box>
      {passArray.length && passArray.map((item: any, index: number) => {
        return <>
          <h3>{item.day} {item.month}</h3>
          {item.passengers.map((passengers: any) => {
          return <CurrentOrderDriver
            key={index}
            time={passengers.time}
            date={passengers.date}
            month={passengers.month}
            passengers={passengers.passengers}
          />
          })}
        </>
      })}
      {/*{pass && pass.filter((item: any) => item.from === value).map((item: any, index: number) => {*/}
      {/*  return <CurrentOrderDriver*/}
      {/*    key={index}*/}
      {/*    time={item.time}*/}
      {/*    date={item.date}*/}
      {/*    month={item.month}*/}
      {/*    passengers={item.passengers}*/}
      {/*  />*/}
      {/*})}*/}
      {/*<Route path={'/ll'} component={<DriverPassengers state={state} /> }/>*/}
      <Link to={'/'}><button className={"but  but-driver"}>Назад</button></Link>
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