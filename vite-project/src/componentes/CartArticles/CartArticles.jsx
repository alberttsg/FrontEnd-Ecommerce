import { Card } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, DeleteOutlined, SecurityScanTwoTone } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { CartGlobalContext } from '../../context/cartContext/CartGlobalState'
import './CartArticles.scss'

function CartArticles(props) {
  const { addCart } = useContext(CartGlobalContext);
  const { productName, productImg, product_id, quantity } = props;

  function onClickHandler(e) {
    switch (e) {
      case '-':
        addCart(product_id, quantity - 1);
        break;
      case '+':
        addCart(product_id, quantity + 1);
        break;
    }
  }

  return (

    <Card size="small" style={{ width: 800, height: 120 }}>
      <div className='containerCardInfo'>
        <img src={productImg} height={92} width={92} alt='product img' />
        <p>{productName}</p>
        <div id={product_id} className='containerCardInfo'>
          <PlusCircleOutlined id='plus' className='quantityButton' onClick={() => onClickHandler('+')} />
          <span>{quantity}</span>
          <MinusCircleOutlined id='minus' className='quantityButton' onClick={() => onClickHandler('-')} />
        </div>
      </div>
    </Card>
  )
}

export default CartArticles;
