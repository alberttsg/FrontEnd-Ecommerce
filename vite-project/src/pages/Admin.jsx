import React, { useEffect, useState} from 'react'
import axios from 'axios'
import './Admin.scss'
import { DeleteOutlined } from '@ant-design/icons';
import { Form, Modal, Input, Button } from 'antd';
import { ProductCreated } from './ProductCreated';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [ products, setProducts ] = useState([])
  const [ btnUpdate, setBtnUpdate ] = useState('Edit')
  const [ inputDisabled, setinputDisabled ] = useState(true)
  const [ productCreated, setproductCreated ] = useState()
  const [ productUpdate, setProductUpdate ] = useState({})
  const [form] = Form.useForm()
  const [formularioVisible, setFormularioVisible] = useState(false);

  const token = JSON.parse(localStorage.getItem('token'))

  const axiosConfig = {
    headers: {
      'Authorization': token
    }
  }

  const getProducts = async () => {

  try{
    const res = await axios.get (`https://backend-ecommerce-production-ce12.up.railway.app/products/all/`, axiosConfig)
      console.log(res.data)
      setProducts([...res.data])

  } catch(error){
    console.log(error)
  }
}

const deleteProduct = async(_id) => {

  setOpen(true)

  try{
    await axios.delete(`https://backend-ecommerce-production-ce12.up.railway.app/products/id/${_id}`, axiosConfig)

  } catch(error){
    console.log(error)
  }

  setTimeout(() => {
    setOpen(false)
  }, 1000);

  getProducts()

}

  useEffect(()=>{
    getProducts()
  },[])

  const createProduct = async (values) => {

    form.resetFields()
    try{
      const res = await axios.post(`https://backend-ecommerce-production-ce12.up.railway.app/products/create`, values, axiosConfig)
      setproductCreated(res.data)

      setTimeout(()=>{
        setproductCreated()
      }, 4000)

    } catch(error){
      console.log(error)
    }

    getProducts()

  };

  const updateProduct = async (values) => {
    console.log(values)

    if(btnUpdate == 'Edit'){
      setBtnUpdate('Update')
      setinputDisabled(false)
      return

    } else {
      setBtnUpdate('Edit')
      setinputDisabled(true)

      console.log(values)
    }

    try{
      const res = await axios.put(`https://backend-ecommerce-production-ce12.up.railway.app/products/id/${values.id}`, values, axiosConfig)
      console.log(res)

    } catch(error){
      console.log(error)
    }

    getProducts()
  }
  return (
    <div id='bodyProducts' >
       <div className='handle-actions-container'>

    <div onClick={() => setFormularioVisible(!formularioVisible)}>{formularioVisible ? 'Ocultar crear Producto' : ' Crear producto'}</div>
    <div onClick={()=>navigate('/admin/user')}>Administrar Usuarios</div>
    </div>
    {formularioVisible && (<div className='formAndProduct'>
      <Form className='form'
    form={form}
    onFinish={createProduct}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 400,
    }}
    initialValues={{
      remember: true,
    }}
  >
    <Form.Item
      label="Brand"
      name="brand"
      rules={[
        {
          required: true,
          message: 'Brand',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Name',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Category"
      name="category"
      rules={[
        {
          required: true,
          message: 'Category',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="url-Image"
      name="image"
      rules={[
        {
          required: true,
          message: 'url-Image',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Price"
      name="price"
      rules={[
        {
          required: true,
          message: 'Price',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Crear
      </Button>
    </Form.Item>
  </Form>
  { productCreated ? <ProductCreated brand={productCreated.brand} name={productCreated.name} category={productCreated.category} image={productCreated.image} price={productCreated.price}/> : <div></div> }
  </div>)}
    <Modal open={open} footer={[]}><b><h3>Producto borrado con exito</h3></b></Modal>
      <div id='divProducts'>
              {
          products.map((e, index)=>(
            <div className='eachProduct'  key={`products${index}`}>

            <Form id='allProducts' onFinish={updateProduct} initialValues={{ id:e._id, brand:e.brand, name:e.name, category:e.category, price:e.price }}>
            <Form.Item
              name="id"
              className='inputId'
              rules={[
                {
                  required: true
                  },
                ]}
              >
              <Input />
            </Form.Item>
            <Form.Item
              name="brand"
              rules={[
                {
                  required: true,
                  message: 'Brand',
                  },
                ]}
              >
              <Input disabled={inputDisabled} />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'name',
                  },
                ]}
              >
              <Input disabled={inputDisabled} />
            </Form.Item>
            <Form.Item
              name="category"
              rules={[
                {
                  required: true,
                  message: 'category',
                  },
                ]}
              >
              <Input disabled={inputDisabled} />
            </Form.Item>
            <div className='img'>
              <img src={e.image}/>
              </div>
            <div className='price'>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: 'price',
                  },
                ]}
              >
              <Input disabled={inputDisabled} />
            </Form.Item>
              €
              </div>
              <div className='btn'>
              <Button type="primary" htmlType="submit" >{ btnUpdate }</Button>
              </div>
              <div className='delete-btn'>
              <DeleteOutlined onClick={()=>deleteProduct(e._id)}/>
              </div>
              </Form>
            </div>
              
          ))
        }
      </div>
    </div>
  )
}
