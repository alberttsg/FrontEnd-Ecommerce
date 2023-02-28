import React, { useEffect } from 'react'
import axios from 'axios'

export const Admin = () => {

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

  } catch(error){
    console.log(error)
  }
}

  useEffect(()=>{
    getProducts()
  },[])

  return (
    <div>

    </div>
  )
}
