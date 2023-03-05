import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/login/Login';
import { Profile } from '../pages/Profile';
import Register from '../pages/register/Register';
import Cart from '../pages/cart/Cart'
import { Admin } from '../pages/Admin'
import AdminUser from '../pages/admin/AdminUser';
import { PrivateZone } from '../guards/guards';
import { PageNotFound } from '../guards/guards';


const AppRoutes = () => {
  return useRoutes(

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
                element: <PrivateZone><Profile/></PrivateZone>,
                path: '/profile'
              },
              {
                element: <Cart/>,
                path: '/cart'
              },
              {
                element: <PrivateZone><Admin/></PrivateZone> ,
                path: '/admin'
              },
              {
                element: <PrivateZone><AdminUser/></PrivateZone> ,
                path: '/admin/user'
              },
              {
                element: <PageNotFound/> ,
                path: '*'
              },
        ]
        );

};

export default AppRoutes;
