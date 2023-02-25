import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './componentes/AppRoutes';
import './App.scss'
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';

function App() {

  return (
   <BrowserRouter>
      <Header/>
      <AppRoutes/>
      <Footer/>
   </BrowserRouter>
  )
}

export default App
