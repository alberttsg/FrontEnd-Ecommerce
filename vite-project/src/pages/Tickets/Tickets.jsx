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
    console.log(tickets)

    tickets.map((e)=>console.log(e.user.username))

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
          <div key={`tickets${index}`} id='ticketsUser'>
          <div><strong>Owner:</strong> {e.user.username}</div>
          <div>{e.items.map((e, index)=>(
            <div id='ticketsUser' key={`${index}`}>
              <div> <strong>Brand:</strong>  {e.product.brand}</div>
              <div><strong>Name:</strong> {e.product.name}</div>
              <img src={e.product.image}/>
              <div><strong>Price:</strong> <b>{e.product.price}</b> $</div>
            </div>
          ))}</div>
          </div>
        ))
      }




      {/* {
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
      } */}
    </div>
  )
}
