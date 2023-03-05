import './Products.scss';
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { DownOutlined, ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Modal, Dropdown, Space, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { ProductRating } from '../Reviews/ProductRating.jsx'
import { ReviewsDrawer } from '../Reviews/ReviewsDrawer';

const items = ['hola', 'hola2', 'hola3'];

export function Products() {
  const { Meta } = Card;
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(10)
  const [modalProduct, setModalProduct] = useState([])
  const currentPageProducts = products.slice(0, productsPerPage)
  let location = useLocation();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState();

  async function getProducts(callback) {
    const res = await axios.get('https://backend-ecommerce-production-ce12.up.railway.app/products/all')
    const data = res.data
    callback(data)
  };

  useEffect(() => {
    getProducts(setProducts);
  }, []);

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    console.log(location.pathname)
    const productCategoryUnclean = products.map(product => product.category)
    const productCategoryObj = new Set(productCategoryUnclean)
    const productCategory = [...productCategoryObj]
    const Obj = Object.assign({ key: {} }, { productCategory })
  }, [products]);

  return (
    <>
      <div className="container" >
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ['3'],
          }}
        >
          <Typography.Link>
            <Space>
              Fiter
              <DownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>

        <div className="container-products">
          {currentPageProducts &&
            currentPageProducts.map(product => {
              const img = product.image
              console.log(img)
              return (<div key={product._id}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      className="img-products"
                      alt="img"
                      src={img ? img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'}
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

          <Modal mask={false} open={isModalOpen} onOk={handleOk} okText='Add to cart' onCancel={handleCancel} cancelText='Close' className='modal'>
            <h1>{modalProduct.name}.</h1>
            <img src={modalProduct.image} alt={modalProduct.name} />
            <p>Brand: {modalProduct.brand}</p>

            <p className="price">Price: {modalProduct.price}€</p>
          </Modal>

          {drawerProduct && <ReviewsDrawer product={drawerProduct} isOpen={isDrawerOpen} toClose={onDrawerClose} />}

        </div>

      </div>
    </>
  )
}