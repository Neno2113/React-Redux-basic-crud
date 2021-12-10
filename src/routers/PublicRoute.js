

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

export const PublicRoute = ({ children }) => {

    const { uid } = useSelector(state => state.auth);

    const isLoggeIn = !!uid;

    return isLoggeIn
        ? <Navigate to="/" />
        : children
     
    
}
