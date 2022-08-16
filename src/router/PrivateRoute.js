import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../context/AuthContent';

export const PrivateRoute = ({ children, roles }) => {
    const { logged } = useContext( AuthContext );
    const { pathname, search } = useLocation();
    
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath );

    console.log(roles)

    return (logged)
        ? children
        : <Navigate to="/login" />
}
