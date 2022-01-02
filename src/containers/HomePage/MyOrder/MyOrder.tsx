import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";
import {GetOrdersReq} from "../../../redux/actions/currentValue";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import axios from "axios";



import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ModalAlert from "../../../components/ModalAlert/ModalAlert";

const MyOrder = ({setShow}: any) => {


  const {currentOrder, currentUserId, orders}: any = useSelector<RootState>(state => ({
    currentOrder: state.auth.currentUser.currentOrder,
    currentUserId: state.auth.currentUser.id,
    orders: state.value.orderList
  }))

  const [isAlert, setAlert] = useState<string>('')
  const [userId, setUserId] = useState<string>('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetOrdersReq(currentUserId))
  }, [])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#282c34",
      color: theme.palette.common.white,
      fontSize: 15,
      padding: "12px 3px"

    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      padding: "9px 3px"
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  function deleteHandler(id: string) {
    axios.delete("http://localhost:5002/api/user/order", {params: {id}})
      .then(() => {
        dispatch(GetOrdersReq(currentUserId))
        setAlert('')
      })
  }



  return (
    <div className={"orderList"}>
      <h2>Мои заказы</h2>

      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell  align="center">

              </StyledTableCell>
              <StyledTableCell  align="center">Дата</StyledTableCell>
              <StyledTableCell align="center">Цена</StyledTableCell>
              <StyledTableCell align="center">Откуда</StyledTableCell>
              <StyledTableCell align="center">Водитель</StyledTableCell>
              <StyledTableCell align="center">Машина</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: any, index: any) => (
              <CustomRow setUserId={setUserId} setAlert={setAlert} key={order.id} keys={index} order={order} StyledTableRow={StyledTableRow} StyledTableCell={StyledTableCell}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button onClick={() => setShow('/')} className={"control-button but-driver"}>Назад</button>
      {isAlert ? <ModalAlert confirm={() => deleteHandler(userId)} cancel={() =>setAlert('')} alert={isAlert} /> : null}
    </div>
  );
};


const CustomRow = ({setUserId, order, StyledTableRow, StyledTableCell, keys, setAlert }: any) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  function deleteHandler(id: string, time: string, day: number, month: string) {
    setAlert(`Вы точно хотите удалить заказ на ${time} ${day} ${month}`)
    setUserId(id)
    // console.log(id)
    // axios.delete("http://localhost:5002/api/user/order", {params: {id}})
    //   .then(() => {
    //     dispatch(GetOrdersReq(userId))
    //   })
  }

  return (
    <>
      <StyledTableRow key={order.name}>
        <StyledTableCell  align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="center">{order?.time} {order?.numberDay}.01.2022</StyledTableCell>
        <StyledTableCell align="center">{order?.amount * 9} р.</StyledTableCell>
        <StyledTableCell align="center">{order?.from}</StyledTableCell>
        <StyledTableCell align="center">{order?.taxiDriver.carMake}</StyledTableCell>
        <StyledTableCell align="center">{order?.taxiDriver.number}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <table className={"collapse__table"}>
              <tr className={"collapse__table-tr first"}>
                <div >
                  <img className={"collapse-photo"} style={{height: "50px"}} src={order.taxiDriver.avatar} alt="photo"/>
                </div>
                <div className={"collapse-name"}>
                  {order.taxiDriver.name} {order.taxiDriver.surname}
                  <div>+{order.taxiDriver.email}</div>
                </div>
              </tr>
              {/*<tr className={"collapse__table-tr"}>+{order.taxiDriver.email}</tr>*/}
              <tr className={"collapse__table-tr"}>{order.time} {order.numberDay} {order.month} 2022</tr>
              <tr className={"collapse__table-tr first"}>
                <div className={"collapse-route"}>{order.taxiDriver.from === "Минск" ? "Барановичи" : "Минск"}</div>
                <div style={{display: "flex", alignItems: 'center'}}><ArrowRightAltIcon/></div>
                <div className={"collapse-route"}>{order.taxiDriver.from === "Минск" ? "Минск" : "Барановичи"}</div>
              </tr>
              <tr className={"collapse__table-tr"}>
                <b>Марка: </b> {order.taxiDriver.carMake} <b>Номер: </b> {order.taxiDriver.number}
              </tr>
              <tr className={"collapse__table-tr"}><b>Цвет: </b> {order.taxiDriver.carColor} <b>Перевозчик: </b> {order.taxiDriver.transporter}</tr>
              <tr className={"collapse__table-tr"}>
                <label htmlFor={`tv${keys}`}> ТВ</label>
                <input disabled checked={order.taxiDriver.tv}  id={`tv${keys}`} type="checkbox"/>
                <label htmlFor={`v220${keys}`}> 220В</label>
                <input disabled checked={order.taxiDriver.v220}  id={`v220${keys}`} type="checkbox"/>
                <label htmlFor={`wifi${keys}`}> Wifi</label>
                <input disabled checked={order.taxiDriver.haveWifi}  id={`wifi${keys}`} type="checkbox"/>
              </tr>
              <tr className={"collapse__table-tr"}><div className={"collapse-cost"}>Cтоимость: 9р</div></tr>
              <tr className={"collapse__table-tr"}><button className={"collapse-button"} onClick={() => deleteHandler(order.id, order.time, order.numberDay, order.month)}>Отменить заказ</button></tr>
            </table>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  )
}

export default MyOrder;