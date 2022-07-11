import React, { useState, useEffect } from 'react'
import { SimpleCard } from 'matx'
import SpecialOrderViewer from './SpecialOrderDetails'
import SpecialOrderEditor from './SpecialOrderEditor'

const SpecialOrder = ({ location }) => {
  const [showOrderEditor, setShowOrderEditor] = useState(false)
  const [isNewOrder, setIsNewOrder] = useState(false)
 

  const { id, specialOrder } = location.state
  console.log(id, specialOrder)
  // console.log(order)

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
    <SimpleCard className='m-sm-30'>
      {showOrderEditor ? (
        <SpecialOrderEditor
          toggleOrderEditor={toggleOrderEditor}
          isNewOrder={isNewOrder}
          id={id}
          status = {specialOrder.status}
        />
      ) : (
        <SpecialOrderViewer toggleOrderEditor={toggleOrderEditor} id={id} />
      )}
    </SimpleCard>
  )
}

export default SpecialOrder
