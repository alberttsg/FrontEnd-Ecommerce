import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';



const AppRoutes = () => {
    return useRoutes (

        [
            {
                element: <Home/>,
                path: '/'
              },
        
        ]
        );
    
};

export default AppRoutes;
 