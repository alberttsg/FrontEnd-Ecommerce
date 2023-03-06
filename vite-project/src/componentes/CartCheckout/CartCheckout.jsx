import { Input, Divider, Button, Space} from 'antd';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartGlobalContext } from '../../context/cartContext/CartGlobalState';
import './CartCheckout.scss'

function CartCheckout(props){

  const navigate = useNavigate();
  const { total } = props;
  const { Search } = Input;
  const { clearCart } = useContext(CartGlobalContext);
  const [discount, setDiscount] = useState(1);
  const [ errorDiscount, setErrorDiscount ] = useState();

  function promo(tryCupon){
    setErrorDiscount('');
      switch(tryCupon){
        case 'rebajita10':
          return(setDiscount(0.1));
        case 'rebajita20':
          return(setDiscount(0.2));
        default:
          setDiscount(1);
          setErrorDiscount('Codigo Erroneo');
          return;
      }
  }

  useState(() => {
    promo()
  },[discount])

  function paymentHandler(){
    clearCart();
    navigate('/profile');
  }

  function discountHandler(){
    return discount === 1 ? 0 : Math.round((total * discount + Number.EPSILON) * 100) / 100;
  }

  return(
    <div className='checkout_container'>
      <Search
        placeholder="Discount code"
        allowClear
        enterButton="Apply"
        size="large"
        onSearch={(tryCupon)=> promo(tryCupon)}
      />
      <span style={{color: 'red'}}>{errorDiscount}</span>
      <Divider/>
      <div className='checkoutPrices'>
        <span>SubTotal</span>
        <span>{total}</span>
      </div>
      <div className='checkoutPrices'>
        <span>Discount</span>
        <span style={{color:'red'}}>{discountHandler()}</span>
      </div>
      <div className='checkoutPrices'>
        <span>Shipping</span>
        <span>100</span>
      </div>
      <Divider/>
      <Space direction='vertical' size={100} align='center'>
        <div className='checkoutPrices'>
          <Space size={100}>
            <span>Total</span>
            <span>{ (total - discountHandler()) + 100 }</span>
          </Space>
        </div>
        <Button type="primary" shape="round" size='large' onClick={ ()=>{paymentHandler()} }>
          Payment
        </Button>
      </Space>
    </div>
  )
}

export default CartCheckout;
