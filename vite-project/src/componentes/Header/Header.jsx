import React, {useState} from 'react';
import InputHeader from '../InputHeader';
import './Header.scss';
import {  UserOutlined, HeartOutlined, ShoppingCartOutlined  } from "@ant-design/icons";
import HeaderButton from '../HeaderButton';
import { Badge } from 'antd';
import image from '../../assets/logoDone2.png'
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'; 
import LinkContainer from '../LinkContainer';



const Header = () => {
    // const {primary } = Button
    const navigate = useNavigate()
    const [userCheck, setUserCheck]= useState()
    const [cartCount, setCartCount] = useState(0);
    const handleClickforUser=()=>{
        console.log('handle user click for user, 15 line')
        setUserCheck(!userCheck)
    }
    const addProduct = ()=>{
        setCartCount(cartCount + 1);
    }
    return (
    <div className="header-rows-container">
        <div className='header-container'>  
            <div onClick={addProduct} className="left-side"><img src={image} alt="logo" className='logo-class'/></div>
            <InputHeader/>
            <div className="icons-container">
            <HeaderButton handleClick={()=>console.log('soy carritoooooo')} icon={ <Badge count={cartCount}>
                <ShoppingCartOutlined style={{fontSize: '30px' ,color: 'white'}}/>

            </Badge>
            }/>
            <HeaderButton handleClick={()=>console.log('soy megustaaa')} icon={<HeartOutlined style={{fontSize: '30px' ,color: 'white'}}/>}/>


            <div className='user-button' onClick={handleClickforUser}> <UserOutlined style={{fontSize: '30px' ,color: 'white'}}/>
                    {userCheck &&(
                        <div className='user-check-class'>
                            <Button className={'login-button-class'}  onClick={()=>navigate('/login')}> Login</Button>
                            <p> ¿Aún no tienes cuenta?</p>
                            <Button  className={'register-button-class'} onClick={()=>navigate('/register')}> Registrate!</Button>
                            {/* <li className={'right-button'} text={'Todas las noticias'} onClick={()=>navigate('/news')}> Noticias</li> */}
                        </div>
                    )}
                    </div>
              
            </div>
        </div>
        <LinkContainer/>
    </div>
    );
};

export default Header;
