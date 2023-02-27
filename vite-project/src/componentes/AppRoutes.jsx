import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { Profile } from '../pages/Profile';
import Register from '../pages/Register';
import Cart from '../pages/cart/Cart'



const AppRoutes = () => {
    return useRoutes (

        [
            {
                element: <Home/>,
                path: '/'
              },
              {
                element: <Login/>,
                path: '/login'
              },
              {
                element: <Register/>,
                path: '/register'
              },
              {
                element: <Profile/>,
                path: '/profile'
              },
              {
                element: <Cart/>,
                path: '/cart'
              }
        
        ]
        );
    
};

export default AppRoutes;
 