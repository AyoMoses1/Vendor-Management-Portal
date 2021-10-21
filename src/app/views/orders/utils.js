export const paymentMethod = [
  {
    label: 'Bank Transfer',
    value: 'PAYMENT_METHOD_BANK_TRANSFER',
  },
  {
    label: 'Cash',
    value: 'PAYMENT_METHOD_CASH',
  },
  {
    label: 'Paystack',
    value: 'PAYMENT_METHOD_PAYSTACK',
  },
  {
    label: 'POS',
    value: 'PAYMENT_METHOD_POS',
  },
  {
    label: 'Wallet',
    value: 'PAYMENT_METHOD_WALLET',
  },
]
 
export const shippingMethod = [
  {
    label: 'Delivery',
    value: 'DELIVERY',
  },
  {
    label: 'Drop Off',
    value: 'DROP_OFF',
  },
  {
    label: 'Pick Up',
    value: 'PICK_UP',
  },
]

export const calculateTotal = (i, event, newValues, fields, product) => {
  const values = [...fields]
  let price, qty
  const { name, value } = event.target
  values[i][name] = parseInt(value)
  price = product.price
  qty = values[i].itemQuantity
  values[i].totalPrice = price * qty
  return values
}
