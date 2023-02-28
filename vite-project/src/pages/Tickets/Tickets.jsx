import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Tickets = () => {

  const [ tickets, setTickets ] = useState([])

  useEffect(()=>{
    putCart()
  }, [])

  const token = JSON.parse(localStorage.getItem('token'))


const putCart = async () => {

  const config = {
    headers:{
      "Authorization":token
    }
  };

  try {
    const res = await axios.get('https://backend-ecommerce-production-ce12.up.railway.app/tickets/all', config)

    const tickets = res.data

    setTickets(tickets)

  } catch(error){
    console.log(error.response.data)
  }
}

  return (
    <div id='ticket'>
    <div id='divTickets'>Tickets</div>
      {
        tickets.map((e, index)=>(
          e.items.map((e)=>(
            <div id='ticketsUser' key={`${index}`}>
              <div> <strong>Brand:</strong>  {e.product.brand}</div>
              <div><strong>Name:</strong> {e.product.name}</div>
              <img src={e.product.image}/>
              <div><strong>Price:</strong> <b>{e.product.price}</b> $</div>
            </div>
          ))
      ))
      }
        {/* <div id='total'><b>Total:</b> { total }</div> */}
    </div>
  )
}
