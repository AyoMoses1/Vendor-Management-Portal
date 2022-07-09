import React, { useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { useDialog } from 'muibox'
import {
  Grow,
  Icon,
  IconButton,
  TextField,
  Button,
  MenuItem,
} from '@material-ui/core'
import './special-orders.css';
import { getSpecialOrders } from '../../../redux/actions/ussd-action';
import { useDispatch, useSelector } from 'react-redux'



const USSDSpecialOrdersComponent = () => {
  const { loading, specialOrders, error } = useSelector(
    (state) => state.getSpecialOrders,
  );
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(getSpecialOrders({}));
  }, [])

  useEffect(() => {
    console.log(specialOrders);
  }, [specialOrders])

  return (
    <div>
      Test
    </div>
  )
}

export default USSDSpecialOrdersComponent