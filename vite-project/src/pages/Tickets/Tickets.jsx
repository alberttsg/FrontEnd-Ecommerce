import React from 'react'
import axios from 'axios'

export const Tickets = () => {

  const cart = [
    {
      "_id": "63f9f1de146ac4bcdab15105",
      "user": {
        "_id": "63f9f66bf1d07502a427e0aa",
        "username": "Client1234",
        "password": "$2y$10$uEx2XAONcwTZyK531rSJd.c2wfJ2lSxKPXnqWSaMZWEWMhSf1VVeS",
        "email": "client1234@email.com",
        "role": "client",
        "createdAt": "2023-02-23T21:30:13.106Z",
        "updatedAt": "2023-02-23T21:30:13.106Z",
        "__v": 0
      },
      "items": [
        {
          "product": {
            "_id": "507f1f77bcf86cd799439624",
            "name": "Product",
            "price": 14.25,
            "brand": "Brand",
            "category": "Category",
            "image": "https://img.freepik.com/vector-gratis/dibujado-mano-zapatillas-deporte-color-verde-neon_1051-344.jpg?w=1380&t=st=1677328084~exp=1677328684~hmac=9ea44db5fdc4acc0bae00e96de584094e6810d4e1762905f77d20224ca143477",
            "__v": 0
          },
          "quantity": 10
        }
      ],
      "total": 142.5,
      "createdAt": "2023-02-23T21:30:13.106Z",
      "updatedAt": "2023-02-23T21:30:13.106Z"
    }
]

localStorage.setItem('cart', JSON.stringify(cart))

const ticket = JSON.parse(localStorage.getItem('cart'))


const cartArray = ticket[0].items

const putCart = async () => {

  const config = {
    headers:{
      "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNmOWYxZGUxNDZhYzRiY2RhYjE1MTA1Iiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY3NzUxNzY2NCwiZXhwIjoxNjc3NjA0MDY0fQ.dTtT-Dc7RFb7iOKvg41DlIXWAz9gkQ72P8I7qA3R4dE"
    }
  };

  try {
    const res = await axios.put('https://backend-ecommerce-production-ce12.up.railway.app/tickets/clearcart', cartArray, config)
    console.log(res)

  } catch(error){
    console.log(error)
  }
}

putCart()
const total = ticket[0].total



console.log('******')
console.log(ticket)
console.log(cartArray)


cartArray.map((e)=>console.log(e))


  return (
    <div id='ticket'>
        {
          cartArray.map((e, index)=>
          <div id='items' key={`items${index}`}>
            <div><b>Marca: </b>{e.product.brand}</div>
            <div><b>Product: </b>{e.product.name}</div>
            <img src={e.product.image}/>
            <div><b>Precio:</b> {e.product.price}</div>
            <div><b>Cantidad:</b>{e.quantity}</div>
          </div>
          )
        }
        <div id='total'><b>Total:</b> { total }</div>
    </div>
  )
}
