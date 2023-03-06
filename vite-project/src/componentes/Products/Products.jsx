import './Products.scss';
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { DownOutlined, ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Modal, Dropdown, Space, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { ProductRating } from '../Reviews/ProductRating.jsx'
import { ReviewsDrawer } from '../Reviews/ReviewsDrawer';
import { Button } from 'antd';
import imageNot from '../../assets/Image_not_available.png'

export function Products(props) {
  const { Meta } = Card;
  const { route, search } = props;
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(10)
  const [modalProduct, setModalProduct] = useState([])
  const [category, setCategory] = useState([])
  const [currentCategory, setCurrentCategory] = useState('ALL')
  const [productsFitlered, setProductsFitlered] = useState([])
  const currentPageProducts = productsFitlered.slice(0, productsPerPage)
  let location = useLocation();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState();

  async function getProducts(callback) {
    switch (route) {
      case 'home':
        const res1 = await axios.get('https://backend-ecommerce-production-ce12.up.railway.app/products/all');
        const data1 = res1.data;
        callback(data1);
        break;
      case 'search':
        const res2 = await axios.get(`https://backend-ecommerce-production-ce12.up.railway.app/products/search/${search}`);
        const data2 = res2.data;
        callback(data2);
        break;
    }
  };

  useEffect(() => {
    getProducts(setProducts);
  }, []);

  useEffect(() => {
    getProducts(setProducts);
  }, [search]);

  const updateProducts = async () => {
    getProducts(setProducts);
  };

  const openDrawer = (product) => {
    setDrawerProduct(product);
    setDrawerOpen(true);
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
    setDrawerProduct();
  };

  const showModal = (product) => {
    setIsModalOpen(true);
    setModalProduct(product)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setProductsPerPage((prev) => prev + 10)
    }
  };
  const handleMenu = (e) => {
    console.log(e.target.innerText)
    setCurrentCategory(e.target.innerText)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    const productCategoryUnclean = products.map(product => product.category)
    const productCategoryObj = new Set(productCategoryUnclean)
    const productCategory = [...productCategoryObj]
    setCategory(productCategory)
    setProductsFitlered(products)
   
  }, [products]);
  useEffect(()=>{

  if (currentCategory !== 'ALL') {
    const x = category.filter(category => category === currentCategory)      
    const filterProduct = products.filter(product => product.category === x.toString())
    setProductsFitlered(filterProduct)
  } else {
    setProductsFitlered(products)
  }
  
  },[currentCategory])
  return (
    <>
      <div className="container" >
        <span className='category-btns'>
          <Button onClick={(e)=>handleMenu(e)} id='ALL' type="primary">ALL</Button>
        {
          category.map((category, index) => {
              return (
                <Button key={index} type="primary" onClick={(e)=>handleMenu(e)}>{category}</Button>
              )
          })
        }
        </span>
       

        <div className="container-products">
          {currentPageProducts &&
            currentPageProducts.map(product => {
              const img = product.image
              // console.log(img)
              

              return (<div key={product._id}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                    className="img-products"
                    alt="img"
                    src={img ? img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'}
                    onError={(e) => {e.target.onerror = null; e.target.src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'}}
                  />
                  

                  }
                  actions={[
                    <InfoCircleOutlined key="info" id={product._id} onClick={() => { showModal(product) }} />,
                    <ShoppingCartOutlined key="cart" onClick={() => { onClickCartHandler(product) }} />
                  ]}
                >
                  <Meta
                    title={product.name}
                    description={
                      <div style={{ display: 'flex', flexFlow: 'column' }} >
                        <ProductRating product={product} onClick={openDrawer} />
                        <p className="price-showed-card">{product.price + '€'}</p>
                      </div>
                    }
                  />
                </Card>
              </div>
              )
            })
          }

          <Modal mask={false} open={isModalOpen} onOk={handleOk} okText='Add to cart' onCancel={handleCancel} cancelText='Close'  okButtonProps={{
    style: { backgroundColor: '#50a9bb', color: '#fff' }
  }} className='modal'cancelButtonProps={{
 
    style: { backgroundColor: '#50a9bb', color: '#fff' }
  }}>
            <h1>{modalProduct.name}.</h1>
            <img src={modalProduct.image} alt={modalProduct.name} />
            <p>Brand: {modalProduct.brand}</p>

            <p className="price">Price: {modalProduct.price}€</p>
          </Modal>

          {drawerProduct && <ReviewsDrawer product={drawerProduct} isOpen={isDrawerOpen} toClose={onDrawerClose} update={updateProducts} />}

        </div>

      </div>
    </>
  )
}