import React, { useContext, useEffect, useState } from 'react';
import InputHeader from '../InputHeader';
import './Header.scss';
import { UserOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import HeaderButton from '../HeaderButton';
import { Badge } from 'antd';
import image from '../../assets/logoDone2.png'
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { CartGlobalContext } from '../../context/cartContext/CartGlobalState'



const Header = () => {
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);
  const [cartCount, setCartCount] = useState(0);
  const { cart } = useContext(CartGlobalContext);

  const handleUserButtonClick = () => {
    setShowUserDropdown(!showUserDropdown);
  }



  const handleAddToCart = () => {
    setCount(cartCount + 1);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setCartCount(0);
    localStorage.removeItem('order');
    setShowUserDropdown(false);
    navigate('/login');
  }
  const handleProfile = () => {
    setShowUserDropdown(false);
    navigate('/profile');
  }

  

  return (
    <div className="header-rows-container">
      <div className='header-container'>
        <div className="left-side" onClick={() => navigate('/')}><img src={image} alt="logo" className='logo-class' /></div>
        <InputHeader />
        <div className="icons-container">
          <HeaderButton handleClick={() => navigate('/cart')} icon={<Badge count={cart.length}><ShoppingCartOutlined style={{ fontSize: '30px', color: 'white' }} /></Badge>} />
          <HeaderButton  icon={<HeartOutlined style={{ fontSize: '30px', color: 'white' }} />} />

          <div className='user-button' onClick={handleUserButtonClick}>
            <UserOutlined style={{ fontSize: '30px', color: 'white' }} />
            {showUserDropdown && (
              <div className='user-check-class'>
                {isLoggedIn ? (
                  <>
                    <Button className={'login-button-class'} onClick={handleLogoutClick}>Cerrar Sesi??n</Button>
                    <Button className={'login-button-class'} onClick={handleProfile}>Ir al perfil</Button>
                  </>
                ) : (
                  <>
                    <Button className={'login-button-class'} onClick={() => navigate('/login')}>Iniciar sesi??n</Button>
                    <Button className={'register-button-class'} onClick={() => navigate('/register')}>Registrarse</Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
