import { Card, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

function CartEmpty(){
  const navigate = useNavigate();
  return(
    <Space direction="vertical" size="medium " align='center'>
      <Card size='medium' style={{ width: 600, height: 150 }}>
        <h1>
          Tu carro esta vacio. ! Llenalo !
        </h1>
        <div style={{ display: 'flex', justifyContent:'center' }}>
          <Button onClick={ () => navigate('/')}>
            VER PRODUCTOS
          </Button>
        </div>
      </Card>
    </Space>
  )
}

export default CartEmpty;
