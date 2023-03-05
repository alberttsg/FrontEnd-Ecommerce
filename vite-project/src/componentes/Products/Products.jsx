import './Products.scss';
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { DownOutlined, ShoppingCartOutlined, InfoCircleOutlined} from '@ant-design/icons';
import { Card, Moda, Dropdown, Space, Typographyc } from 'antd';
import { useLocation } from 'react-router-dom';
import { ProductRating } from "../Reviews/ProductRating";
import { CartGlobalContext } from "../../context/cartContext/CartGlobalState";

const items = ['hola','hola2','hola3'];

export function Products() {
  const { Meta } = Card;
  const { addCart } = useContext(CartGlobalContext);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [modalProduct, setModalProduct] = useState([]);

  const currentPageProducts = products.slice(0, productsPerPage);
  let location = useLocation();

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
    async function getProducts() {
      const res = await axios.get('https://backend-ecommerce-production-ce12.up.railway.app/products/all/1')
      const data = res.data
      setProducts(data)
    }
    getProducts()
  }, [])
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
    console.log(location.pathname)
    const productCategoryUnclean = products.map(product => product.category)
    const productCategoryObj = new Set(productCategoryUnclean)
    const productCategory = [...productCategoryObj]
    const Obj = Object.assign({key:{}},{productCategory})  
    console.log(Obj)
    
},[products])

  function onClickCartHandler(addProduct) {
    addCart(addProduct._id, 1);
  }


  return (<>
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
          
            return(<div key={product._id}>
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
                    <InfoCircleOutlined key="info" id={product._id}  onClick={()=>{showModal(product)}}/>,
                    <ShoppingCartOutlined key="cart" onClick={()=>{onClickCartHandler(product)}} />,
                    ]}
                    >
                    <Meta
                    title={product.name} 
                    description={
                      <div style={{display: 'flex', flexFlow: 'column'}} >
                      <ProductRaiting product={product._id} />
                      <p>{product.price + '€'}</p>``
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