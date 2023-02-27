import { Input, Divider, Button, Space} from 'antd'
import './CartCheckout.scss'

function CartCheckout(props){
  const { total } = props;
  const { Search } = Input;
  return(
    <div className='checkout_container'>
      <Search
        placeholder="Discount code"
        allowClear
        enterButton="Apply"
        size="large"
        onSearch={()=> console.log('discount')}
      />
      <Divider/>
      <div className='checkoutPrices'>
        <span>SubTotal</span>
        <span>100</span>
      </div>
      <div className='checkoutPrices'>
        <span>Shipping</span>
        <span>100</span>
      </div>
      <Divider/>
      <Space direction='vertical' size={100} align='center'>
        <div className='checkoutPrices'>
          <span>Total</span>
          <span>200</span>
        </div>
        <Button type="primary" shape="round" size='large'>
          Payment
        </Button>
      </Space>
    </div>
  )
}

export default CartCheckout;
