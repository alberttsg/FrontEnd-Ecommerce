import React from 'react';
import { Products } from '../componentes/Products/Products';

import './Home.scss';


const Home = () => {

    return (
        <div className='scroll-items'>
            <Products route='home'/>
        </div>
    );
};

export default Home;