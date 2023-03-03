import React, { useEffect, useState} from 'react'
import axios from 'axios'
import './Admin.scss'
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = JSON.parse(localStorage.getItem('token'))

  const axiosConfig = {
    headers: {
      'Authorization': token
    }
  }

  const [ products, setProducts ] = useState([])

  const getProducts = async () => {


  try{
    const res = await axios.get (`https://backend-ecommerce-production-ce12.up.railway.app/products/all`, axiosConfig)
      console.log(res.data)
      setProducts([...res.data])

  } catch(error){
    console.log(error)
  }
}

const deleteProduct = async(_id) => {
  console.log(_id)
  try{
    const res = await axios.delete(`https://backend-ecommerce-production-ce12.up.railway.app/products/id/${_id}`, axiosConfig)
      console.log(res.data)

  } catch(error){
    console.log(error)
  }

  getProducts()

  setIsModalOpen(true)

  setInterval(() => {
    setIsModalOpen(false)
  }, 3000);


}

  useEffect(()=>{
    getProducts()
  },[])

  return (
    <div id='bodyProducts'>
    <div className='handle-actions-container'>

    <div>Crear Producto</div>
    <div onClick={()=>navigate('/admin/user')}>Administrar Usuarios</div>
    </div>
    <Modal title="Producto borrado con exito" open={isModalOpen}>
      </Modal>
    <div id='divProducts'>
      {
        products.map((e, index)=>(
          <div id='allProducts' key={`products${index}`} onClick={()=>deleteProduct(e._id)}>
            <div>Brand: {e.brand}</div>
            <div>Name: {e.name}</div>
            <div>Category: {e.category}</div>
            <img src={e.image}/>
            <div>Price: {e.price}€</div>
          </div>
        ))
      }
      </div>

    </div>
  )
}
