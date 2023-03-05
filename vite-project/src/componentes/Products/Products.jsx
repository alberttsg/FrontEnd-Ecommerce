import './Products.scss';
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Modal } from 'antd';
import { ProductRating } from "../Reviews/ProductRating";
import { UserContext } from '../../context/UserContext/UserState';
import { CartGlobalContext } from '../../context/cartContext/CartGlobalState'

export function Products() {
  const { Meta } = Card;
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [modalProduct, setModalProduct] = useState([]);
  const currentPageProducts = products.slice(0, productsPerPage);
  const { getUserInfo } = useContext(UserContext);
  const { addCart } = useContext(CartGlobalContext);

  useEffect(() => {
    async function getData() {
      await getUserInfo();
    };
    getData();
  }, [])

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
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])



  useEffect(() => {
    async function getProducts() {
      const res = await axios.get('https://backend-ecommerce-production-ce12.up.railway.app/products/all/1')
      const data = res.data
      setProducts(data)
    }
    getProducts()
  }, [])

  function onClickCartHandler(addProduct) {
    addCart(addProduct._id, 1);
  }

  return (<>
    <div className="container" >
      <div className="container-products">
        {currentPageProducts &&
          currentPageProducts.map(product => {

            return (<div key={product._id}>
              <Card
                style={{
                  width: 300,

                }}
                cover={
                  <img
                    className="img-products"
                    alt="img"
                    src={product.image}
                  />
                }
                actions={[
                  <InfoCircleOutlined key="info" id={product._id} onClick={() => { showModal(product) }} />,
                  <ShoppingCartOutlined key="cart" onClick={() => { onClickCartHandler(product) }}/>,
                ]}
              >
                <Meta
                  title={product.name}
                  description={
                    <div style={{ display: 'flex', flexFlow: 'column' }} >
                      <ProductRating product={product} />
                      <p>{product.price + '€'}</p>
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

      </div>
    </div>
  </>
  )
}