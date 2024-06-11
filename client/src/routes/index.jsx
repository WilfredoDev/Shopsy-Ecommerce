import {useRoutes} from 'react-router-dom';
import { Home } from '../pages/Home';
import { CheckoutPage } from '../pages/Checkout';
import { ProfilePage } from '../pages/Profile';
import { OrderHistoryPage } from '../pages/OrderHistory';
import LoginForm from '../components/LoginForm';

const AppRoutes = ()=>{
    let routes = useRoutes([
        {path:'/', element: <Home/>},
        {path:'/checkout', element: <CheckoutPage/>},
        {path:'/profile', element: <ProfilePage/>},
        {path:'/my-orders', element: <OrderHistoryPage/>},
    ]);
    return routes
}

const AuthRoutes = ()=>{
    let routes = useRoutes([
        {path:'/login', element: <LoginForm/>}
    ]);
    return routes
}

export {AppRoutes, AuthRoutes}