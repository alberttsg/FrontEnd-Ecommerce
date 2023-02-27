import { Tickets } from "./pages/Tickets/Tickets"
import { UserProvider } from "./context/UserContext/UserState";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './componentes/AppRoutes';
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import { CartGlobalProvider } from './context/CartGlobalState'
import './App.scss'

function App() {

  return (
   <BrowserRouter>
      <UserProvider>
        <CartGlobalProvider>
            <Header/>
            <AppRoutes/>
            <Footer/>
        </CartGlobalProvider>
      </UserProvider>
   </BrowserRouter>
  )
}

export default App
