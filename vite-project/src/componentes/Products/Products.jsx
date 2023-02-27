import React from "react";
import './Products.scss';
import { useEffect, useState } from "react";
import axios from 'axios'


export function Products() {
    const [Products, setProducts] = useState({});

    useEffect(() => {
        async function getProducts (){
            const res = await axios.get ('https://backend-ecommerce-production-ce12.up.railway.app/products/all')
            const data = res.data
            console.log(data.category)
        }   
        getProducts()
    
    }, [])
    

  return (
    <div className="container">

       
    </div>
  )
  }