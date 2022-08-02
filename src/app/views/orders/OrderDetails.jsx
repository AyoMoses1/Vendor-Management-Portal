import React, { useState, useEffect } from 'react'
import { SimpleCard } from 'matx'
import OrderViewer from './OrderViewer'
import OrderEditor from './OrderEditor'

import './order-view.css'

const OrderDetails = ({ location }) => {
  const [showOrderEditor, setShowOrderEditor] = useState(false)
  const [isNewOrder, setIsNewOrder] = useState(false)

  const { id, order } = location.state

  console.log(order)

  const toggleOrderEditor = () => {
    setShowOrderEditor(!showOrderEditor)
    setIsNewOrder(false)
  }

  useEffect(() => {
    if (id === 'add') {
      setShowOrderEditor(true)
      setIsNewOrder(true)
    }
  }, [id])

  return (
    <>
    <SimpleCard className='m-sm-30 order-revamp'>
      {showOrderEditor ? (
        <OrderEditor
          toggleOrderEditor={toggleOrderEditor}
          isNewOrder={isNewOrder}
          id={id}
        />
      ) : (
        <>
        <OrderViewer toggleOrderEditor={toggleOrderEditor} id={id} />
        </>
      )}
    </SimpleCard>
    </>
  )
}

export default OrderDetails
