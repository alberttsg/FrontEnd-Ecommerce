import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/login/Login';
import { Profile } from '../pages/Profile';
import Register from '../pages/register/Register';
import SearchResult from '../pages/SearchResult';

const AppRoutes = () => {
  return useRoutes(
    [
      {
        element: <Home />,
        path: '/'
      },
      {
        element: <SearchResult />,
        path: '/search/'
      },
      {
        element: <SearchResult />,
        path: '/search/:search'
      },
      {
        element: <Login />,
        path: '/login'
      },
      {
        element: <Register />,
        path: '/register'
      },
      {
        element: <Profile />,
        path: '/profile'
      },

    ]
  );

};

export default AppRoutes;
