import React, {useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios";
import ModalAlert from "../../../components/ModalAlert/ModalAlert";

const ListAccounts = ({setShow}: any) => {


  const [value, setValue] = React.useState(0);
  const [passengers, setPassengers] = React.useState([]);
  const [drivers, setDrivers] = React.useState([]);
  const [isAlert, setAlert] = useState('')
  const [clickCounter, setClick] = useState(0)
  const [currentUser, setUser] = useState<any>('')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getPassengers = async () => {
    const resp = await axios.get("http://localhost:5002/api/admin/users")
    console.log(resp)
    setPassengers(resp.data.resp)
  }

  const getDrivers = async () => {
    const resp = await axios.get("http://localhost:5002/api/admin/drivers")
    console.log(resp)
    setDrivers(resp.data.resp)
  }

  // @ts-ignore
  useEffect( value === 0 ? getPassengers : getDrivers
  ,[value])


  const handleDelete = async () => {
    console.log(currentUser)
    if (clickCounter === 1) {
      const resp = await axios.post("http://localhost:5002/api/admin/deleteuser", {id: currentUser})
      setAlert('')
      getPassengers()
      console.log(resp)
    } else if (clickCounter === 2) {
      const resp = await axios.post("http://localhost:5002/api/admin/ban", {id: currentUser})
      setAlert('')
      getPassengers()
      console.log(resp)
    }
  }

  return (
    <div>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        <Tab label="Пассажиры" />
        <Tab label="Таксисты" />
      </Tabs>
      {value === 0 ?<>
        <h1>Пассажиры</h1>
          <table>
            <tr>
              <th>Имя</th>
              <th>Номер телефона</th>
              <th>Статус</th>
            </tr>
            {passengers && passengers.map((item: any)=> (
              <tr className={'tr'}>
                <td>{item.userName? item.userName : 'Без имени'}</td>
                <td>{item.email}</td>
                <td>{item.ban ? "Активен" : "не определенно"}</td>
                <td className={"td-buttons"}>
                  <button onClick={() => {
                    setAlert(`Вы действительно хотить удалить пользователя с номером ${item.email}?`)
                    setClick(1)
                    setUser(item._id)
                  }}>Удалить</button>
                  <button onClick={() => {
                    setAlert(`Вы действительно запретить вход пользователю ${item.email}?`)
                    setClick(2)
                    setUser(item._id)
                  }}>Запретить</button>
                </td>
              </tr>
            ))}
          </table>
        </>
        : <>
          <h1>Таксисты</h1>
          <table>
            <tr>

              <th>Фото</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Номер телефона</th>
            </tr>
            {drivers.map((item: any) => <tr className={'tr'}>
              <td ><img className={"tr-avatar"} src={item.avatar} alt="photo"/></td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item?.email}</td>
              {/*<td className={"td-buttons"}>*/}
              {/*</td>*/}
            </tr>)}
          </table>
        </>
      }
      <button className={"but"} onClick={() => setShow('')}>Назад</button>
      {isAlert ? <ModalAlert cancel={() => setAlert('')} alert={isAlert} confirm={handleDelete} />: null}
    </div>
  );
};

export default ListAccounts;