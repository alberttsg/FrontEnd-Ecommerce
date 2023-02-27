import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/login/Login';
import { Profile } from '../pages/Profile';
import Register from '../pages/register/Register';




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
        
        ]
        );
    
};

export default AppRoutes;
 