import React from "react";
import './Products.scss';
import { useEffect, useState } from "react";
import axios from 'axios'
import { ShoppingCartOutlined, InfoCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Modal, Card } from 'antd';
import { ProductRating } from "../Reviews/ProductRating";

export function Products() {
  const { Meta } = Card;
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0)
  const productsPerPage = 45
  const maxPage = Math.ceil(products.length / productsPerPage)
  const offSet = page * productsPerPage
  const currentPageProducts = products.slice(offSet, offSet + productsPerPage)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    async function getProducts() {
      const res = await axios.get('https://backend-ecommerce-production-ce12.up.railway.app/products/all')
      const data = res.data
      setProducts(data)
    }
    getProducts()


  }, [])
  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <div className="container">
      {currentPageProducts &&
        currentPageProducts.map(product => {
          return (
            <>
              <Card
                style={{
                  width: 300,

                }}
                cover={
                  <>
                    <img
                      className="img-products"
                      alt="img"
                      src={product.image}
                    />
                    <ProductRating product={product._id} />
                  </>
                }
                actions={[
                  <InfoCircleOutlined key="info" onClick={showModal} />,
                  <ShoppingCartOutlined key="cart" />,
                ]}
              >
                <Meta
                  title={product.name}
                  description={product.price + '€'}
                />
              </Card>
              <Modal title="Basic Modal" mask={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </>
          )
        })
      }
    </div>
  )
}