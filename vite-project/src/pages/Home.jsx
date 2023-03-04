import React from 'react';
import { Products } from '../componentes/Products/Products';

import './Home.scss';
  

const Home = () => {
    return (
        <div className='scroll-items'>
           <Products></Products>
      </div>
    );
};

export default Home;