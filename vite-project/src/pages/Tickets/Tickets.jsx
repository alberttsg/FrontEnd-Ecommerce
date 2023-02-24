import React from 'react'
import { axios } from 'axios'

export const Tickets = () => {

  const cart = [
    {
    product:'t-shirt',
    quantity:2,
    price:21.90
  },
  {
    product:'trousers',
    quantity:1,
    price:39.90
  }
]

localStorage.setItem('cart', JSON.stringify(cart))

const ticket = JSON.parse(localStorage.getItem('cart'))

const putCart = async () => {

  try {
    const res = await axios.put('url', {
      body: ticket
    })
    console.log(res)

  } catch(error){
    console.log(error)
  }
}

  let total = 0

  const keys = Object.keys(ticket[0])

 const sum = ticket.map((e)=> e.quantity * e.price)
 console.log(sum)

 for (let i = 0; i < sum.length; i++) {
  total += sum[i];
}

const totalWithoutDecimals = total.toFixed(2)
console.log(totalWithoutDecimals);

  return (
    <div id='ticket'>
      <div id='keys'>
        {
          keys.map((e, index)=>(
            <div id='key'  key={`k${index}`}>
              <div id='eachKey' key={`keys${index}`}>{ e }</div>
            </div>
          ))
        }
      </div>
      <div id='values'>
        {
          ticket.map((e, index)=>(
            <div id='cart' key={`cart${index}`}>
              <div id='product' key={`pr${index}`}>
                <div key={`product${index}`}>{ e.product }</div>
              </div>
              <div id='quantity' key={`q${index}`}>
                <div key={`quantity${index}`}>{ e.quantity }</div>
              </div>
              <div id='price' key={`p${index}`}>
                <div key={`price${index}`}>{ e.price }</div>
              </div>
            </div>
          ))
        }
      </div>
      <div>{ `Total: ${ totalWithoutDecimals }` }</div>
    </div>
  )
}
