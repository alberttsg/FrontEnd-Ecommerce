
import React from 'react';
import './Footer.scss';
import { TwitterCircleFilled,FacebookFilled, InstagramFilled } from '@ant-design/icons';

const Footer = () => {
    return (
        <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Información de contacto</h4>
              <p>Dirección: Palacio Colomina, Valencia, ES</p>
              <p>Teléfono: 647 555 328</p>
              <p>Correo electrónico: info@commerce.com</p>
            </div>
            <div className="footer-section">
              <h4>Redes sociales</h4>
              <ul>
                <li><InstagramFilled/></li>
                <li><TwitterCircleFilled/> </li>
                <li><FacebookFilled/></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Información de la empresa</h4>
              <p>Tienda en línea para ropa y accesorios de moda</p>
              <p>Establecido en 2023</p>
            </div>
            <div className="footer-section">
              <h4 className='politics'>Políticas</h4>
              <ul>
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