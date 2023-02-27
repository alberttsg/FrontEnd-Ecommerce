import { UserProvider } from "./context/UserContext/UserState";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './componentes/AppRoutes';
import './App.scss'
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      
        <UserProvider>
          <Header />
          <AppRoutes />
          <Footer />
        </UserProvider>
    
      </BrowserRouter>
    </div>
  )
}

export default App
