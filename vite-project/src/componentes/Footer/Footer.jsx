
import React from 'react';
import './Footer.scss';
import { TwitterCircleFilled, FacebookFilled, InstagramFilled } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Información de contacto</h4>
            <p>Dirección: Palacio Colomina, Valencia, ES</p>
            <p>Teléfono: 647 555 328</p>
            <p>Correo electrónico: info@commerce.com</p>
          </div>
          <div className="footer-section">
            <h4>Redes sociales</h4>
            <ul className='social-networks'>
              <li><InstagramFilled /> Instagram</li>
              <li><TwitterCircleFilled />  Twitter</li>
              <li><FacebookFilled /> Facebook</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Información de la empresa</h4>
            <p>Tienda en línea para ropa y accesorios de moda.</p>
            <p>Establecido en 2023</p>
          </div>
          <div className="footer-section">
            <h4 className='politics'>Políticas</h4>
            <ul className='politics-ul'>
              <li><a href="#">Envío</a></li>
              <li><a href="#">Devoluciones</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Commerce</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;