import CartArticles from '../../componentes/CartArticles/CartArticles'
import CartCheckout from '../../componentes/CartCheckout/CartCheckout'
import CartEmpty from '../../componentes/CartEmpty/CartEmpty'
import { useContext, useEffect } from 'react'
import { Card, Space } from 'antd'
import { CartGlobalContext } from '../../context/cartContext/CartGlobalState'
import './Cart.scss'


function Cart(){
  const { cart, cartTotal, getCart } = useContext(CartGlobalContext);

  useEffect(() => {
    getCart();
  },[])


  return(
    <div className='body-class-container'>
     {  
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          
          {
            cart.length === 0 ? <CartEmpty/> :
            cart.map((e,i) =>
            (
              <CartArticles 
                key={'art'+i}
                productName={e.product.name}
                productImg={e.product.image}
                product_id={e.product._id}
                quantity={e.quantity}
                priceArticle={e.product.price}
              />
            ))
          }
        </Space>
      }
      <div className='divider'/>
      <Card style={ { width: 300, height: '450px'} }>
        <CartCheckout 
          total = { cartTotal }
        />
      </Card>
    </div>
  )

}

export default Cart;