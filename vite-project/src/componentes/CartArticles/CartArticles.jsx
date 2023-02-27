import { Card } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, DeleteOutlined} from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { CartGlobalContext } from '../../context/CartGlobalState'
import axios from 'axios'
import './CartArticles.scss'

function CartArticles(props) {
  const { articleName } = props;
  const { cart,getCart } = useContext(CartGlobalContext);
  const [ quantity,setQuantity ] = useState(0);

  useEffect(() => {
    console.log(cart);
  },[cart])

  useEffect(() => {
    getCart();
  },[])

  function onClickHandler(e){
    const operation = e.target.parentElement.id;
    if(operation === 'minus'){
      quantity - 1 <= 0 ? e.target.parentElement.remove():setQuantity(quantity - 1);
    }
    if(operation === 'plus'){
      setQuantity(quantity + 1);
    }
  }

  return (

      <Card size="small" style={ { width: 700, height: 120} }>
        <div className='container'>
          <img height={ 92 } width={ 92 } alt='product img'/>
          <span>Product Name</span>
          <div className='container'>
            <PlusCircleOutlined id='plus' className='quantityButton' onClick={(e) => onClickHandler(e)}/>
            <span>{ quantity }</span>
            <MinusCircleOutlined id='minus' className='quantityButton' onClick={(e) => onClickHandler(e)}/>
          </div>
        </div>
      </Card>
  )
}

export default CartArticles;
