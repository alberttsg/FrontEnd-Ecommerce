import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import './Home.scss';


const Home = () => {
//    const [data,  setData] = useState()
//    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNmN2NjNjg5NzU1YzU3MGZmZDQ1ZWRiIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc3NDM0Mjg4LCJleHAiOjE2Nzc1MjA2ODh9.IS9RUJMud8h5c3ifYJBfucix85HaBeOY5WkBKjSsRhY";
//       useEffect(() => {      
//    const res = axios.get('https://api.escuelajs.co/api/v1/products')
//       .then(res => {
//             console.log(res.data);
//          const products = res.data.map((product) => {
//                 console.log(product);
//                 axios.post('https://backend-ecommerce-production-ce12.up.railway.app/products/create', {
//                         name: product.title,
//                         category: product.category.name,
//                         price: product.price,
//                         image: product.category.image,
//                         brand: 'default'

//                 }, 
//                 {headers: {
//                     "Authorization":  token
//                   }}).then(response => {
//                     console.log(`Producto ${product.id} insertado correctamente`);
//                   }).catch(error => {
//                     console.error(`Error al insertar producto ${product.id}: ${error.message}`);
//                   });
//             });
          
//         }
//         );
//     },[]);
// useEffect(()=>{
//     const res = axios.get('https://api.escuelajs.co/api/v1/users')
//     .then(res=>{
//         console.log(res.data)
//     })
// })
    return (
        <div className='home-class-container'>
           {/* {console.log('products',products, '----product',product)} */}
        </div>
    );
};

export default Home;