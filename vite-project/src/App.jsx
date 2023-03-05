import { UserProvider } from "./context/UserContext/UserState";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './componentes/AppRoutes';
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import { CartGlobalProvider } from './context/cartContext/CartGlobalState'
import './App.scss'
import React, {useState} from "react";

function App() {
  const [showFooter, setShowFooter] = useState(true);
  return (
   <BrowserRouter>
      <UserProvider>
        <CartGlobalProvider>
            <Header/>
            <AppRoutes />
            {showFooter && <Footer />}
        </CartGlobalProvider>
      </UserProvider>
   </BrowserRouter>
  )
}

export default App
