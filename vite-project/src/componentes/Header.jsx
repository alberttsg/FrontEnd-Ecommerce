import React, {useState} from 'react';
import InputHeader from './InputHeader';
import './Header.scss';
import {  UserOutlined, HeartOutlined, ShoppingCartOutlined  } from "@ant-design/icons";
import HeaderButton from './HeaderButton';
import { Badge } from 'antd';
import image from '../assets/logoDone2.png'



const Header = () => {
    const [cartCount, setCartCount] = useState(0);
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
            <HeaderButton handleClick={()=>console.log('soy user')} icon={<UserOutlined style={{fontSize: '30px' ,color: 'white'}}/>}/>
            </div>
        </div>
        <div className="links-container">
            <span>Los más vendidos</span><span>Deporte</span><span>Hombre</span><span>Mujer</span><span>Niñ@s</span><span>Contacto</span>
        </div>
    </div>
    );
};

export default Header;
//<a href="https://www.freepik.es/vector-gratis/puntero-flecha-clic-carro-tienda-linea-logo-ideas-inspiracion-logo-diseno-plantilla-vector-ilustracion-aislada-sobre-fondo-blanco_25342202.htm#query=logo%20compra%20png&position=4&from_view=search&track=ais">Imagen de wangstdo</a> en Freepik