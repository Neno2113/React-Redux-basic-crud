

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }) => {

    const { uid } = useSelector(state => state.auth);

    const isLoggeIn = !!uid;

    return isLoggeIn
        ? children
        : <Navigate to="/auth" />
     
    
}
