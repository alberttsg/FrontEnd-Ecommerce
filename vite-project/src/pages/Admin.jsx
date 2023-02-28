import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Admin.scss'

export const Admin = () => {

  const [ products, setProducts ] = useState([])

  const getProducts = async () => {

  const token = JSON.parse(localStorage.getItem('token'))

  const axiosConfig = {
    headers: {
      'Authorization': token
    }
  }
  try{
    const res = await axios.get (`https://backend-ecommerce-production-ce12.up.railway.app/products/all`, axiosConfig)
      console.log(res.data)
      setProducts([...res.data])

  } catch(error){
    console.log(error)
  }
}

  useEffect(()=>{
    getProducts()
  },[])

  return (
    <div id='bodyProducts'>
    <div>Crear Producto</div>
      {
        products.map((e, index)=>(
          <div id='allProducts' key={`products${index}`}>
            <div>Brand: {e.brand}</div>
            <div>Name: {e.name}</div>
            <div>Category: {e.category}</div>
            <img src={e.image}/>
            <div>Price: {e.price}€</div>
          </div>
        ))
      }
    </div>
  )
}
