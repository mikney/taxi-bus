import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";
import {GetOrdersReq} from "../../../redux/actions/currentValue";


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MyOrder = ({setShow}: any) => {

  const {currentOrder, id, orders}: any = useSelector<RootState>(state => ({
    currentOrder: state.auth.currentUser.currentOrder,
    id: state.auth.currentUser.id,
    orders: state.value.orderList
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetOrdersReq(id))
  }, [])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#282c34",
      color: theme.palette.common.white,
      fontSize: 15,
      padding: "12px 5px"

    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      padding: "9px 5px"
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




  return (
    <div className={"orderList"}>
      <h2>Мои заказы</h2>

      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell  align="center">Дата</StyledTableCell>
              <StyledTableCell align="center">Время</StyledTableCell>
              <StyledTableCell align="center">Цена</StyledTableCell>
              <StyledTableCell align="center">Откуда</StyledTableCell>
              <StyledTableCell align="center">Водитель</StyledTableCell>
              <StyledTableCell align="center">Машина</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: any) => (
              <StyledTableRow key={order.name}>
                <StyledTableCell align="center">
                  {order?.numberDay}
                </StyledTableCell>
                <StyledTableCell align="center">{order?.time}</StyledTableCell>
                <StyledTableCell align="center">{order?.amount * 9} р.</StyledTableCell>
                <StyledTableCell align="center">{order?.from}</StyledTableCell>
                <StyledTableCell align="center">{order?.taxiDriver.car}</StyledTableCell>
                <StyledTableCell align="center">{order?.taxiDriver.name}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button onClick={() => setShow('/')} className={"control-button but-driver"}>Назад</button>
    </div>
  );
};

export default MyOrder;