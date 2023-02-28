import CartArticles from '../../componentes/CartArticles/CartArticles'
import CartCheckout from '../../componentes/CartCheckout/CartCheckout'
import { Card, Space, } from 'antd'
import './Cart.scss'

function Cart(){
  const array = [1,2,3,4,5];
  return(
    <div className='body-class-container'>
     {  
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          {
            array.map((e,i)=>(
              <CartArticles key={'art'+i}/>
            ))
          }
        </Space>
      }
      <div className='divider'/>
      <Card style={ { width: 300 } }>
        <CartCheckout/>
      </Card>
    </div>
  )

}

export default Cart;