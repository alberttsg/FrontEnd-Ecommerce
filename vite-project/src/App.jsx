import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './componentes/AppRoutes';
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import { CartGlobalProvider } from './context/CartGlobalState'
import './App.scss'

function App() {

  return (
   <BrowserRouter>
    <CartGlobalProvider>
        <Header/>
        <AppRoutes/>
        <Footer/>
    </CartGlobalProvider>
   </BrowserRouter>
  )
}

export default App
