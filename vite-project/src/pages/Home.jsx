import React from 'react';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';
import './Home.scss';

const Home = () => {
    return (
        <div className='home-class-container'>
           <Header/>
           <Footer/>
        </div>
    );
};

export default Home;