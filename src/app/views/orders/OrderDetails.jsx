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
      {showOrderEditor ? (
        <SimpleCard className='m-sm-30 order-revamp'>
          <OrderEditor
            toggleOrderEditor={toggleOrderEditor}
            isNewOrder={isNewOrder}
            id={id}
          />
        </SimpleCard>
      ) : (
        <div className='p-sm-30 order-view'>
          <div className="py-20 h-100">
            <OrderViewer toggleOrderEditor={toggleOrderEditor} id={id} />
          </div>
        </div>
      )}
    </>
  )
}

export default OrderDetails
