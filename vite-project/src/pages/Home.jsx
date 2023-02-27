import React from 'react';
import { Products } from '../componentes/Products/Products';

import './Home.scss';

const Home = () => {
    return (
        <div className='home-class-container'>
           <Products></Products>
        </div>
    );
};

export default Home;