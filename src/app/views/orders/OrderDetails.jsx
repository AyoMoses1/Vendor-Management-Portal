import React, { useState, useEffect } from 'react'
import { Card } from '@material-ui/core'
import { Breadcrumb, SimpleCard } from 'matx'
import OrderViewer from './OrderViewer'
import OrderEditor from './OrderEditor'
import { useParams } from 'react-router-dom'

const OrderDetails = ({location}) => {
    const [showOrderEditor, setShowOrderEditor] = useState(false)
    const [isNewOrder, setIsNewOrder] = useState(false)

    const { id } = location.state
    console.log(id)

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
        <SimpleCard className="m-sm-30">
            
            {showOrderEditor ? (
                <OrderEditor
                    toggleOrderEditor={toggleOrderEditor}
                    isNewOrder={isNewOrder}
                    id={id}
                />
            ) : (
                <OrderViewer toggleOrderEditor={toggleOrderEditor} id={id} />
            )}
        </SimpleCard>
    )
}

export default OrderDetails
