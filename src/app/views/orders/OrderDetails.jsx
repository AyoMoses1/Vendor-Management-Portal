import React, { useState, useEffect } from 'react'
import { SimpleCard } from 'matx'
import OrderViewer from './OrderViewer'
import OrderEditor from './OrderEditor'

import './order-view.css'

const OrderDetails = ({ location }) => {
  const [showOrderEditor, setShowOrderEditor] = useState(false)
  const [isNewOrder, setIsNewOrder] = useState(false)
  const [isOpen,setIsOpen] = useState(false)

  const { id, order } = location.state

  console.log(order)

  const toggleOrderEditor = () => {
    // setShowOrderEditor(!showOrderEditor)
    // setIsNewOrder(false)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (id === 'add') {
      setShowOrderEditor(true)
      setIsNewOrder(true)
    }
  }, [id])

  return (
    <>
      <div className='p-sm-30 order-view'>
        <div className="pb-20 h-100">
          <OrderViewer toggleOrderEditor={toggleOrderEditor} id={id} order={order}/>
        </div>
      </div>
    </>
  )
}

export default OrderDetails
