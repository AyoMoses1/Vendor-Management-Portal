import React, {useEffect} from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { useDialog } from 'muibox'
import http from '../../../services/api'

import {
    Grow,
    Icon,
    IconButton,
    TextField,
    Button,
    MenuItem,
  } from '@material-ui/core'

import { Link } from 'react-router-dom'
import './special-orders.css'
import Loading from 'matx/components/MatxLoadable/Loading'


// Please remember to check the invoice functionalities of the orders.js



const USSDSpecialOrdersComponent = () => {

    const [specialOrders, setSpecialOrders] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const getAllSpecialOrders = () => {
        setLoading(true)
        http.get('/special-orders/search').then((res)=>{
            setSpecialOrders(res?.data.object)
            console.log(res)
            setLoading(false)
        })
    }

    React.useEffect(()=>{
        getAllSpecialOrders()
    }, [])


    const specialElements = !specialOrders ? <p>I love the napster</p>: specialOrders.map(order=>{
        return <p>order</p>
    })
  return (
    <div>
        {specialElements}
    </div>
  )
}

export default USSDSpecialOrdersComponent