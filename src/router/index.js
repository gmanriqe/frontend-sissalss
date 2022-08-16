// 1ero: Paquetes de terceros
import { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContent';

// 2do: Paquetes de mi propio proyecto
import Login from '../views/Login';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from "./PrivateRoute";
import SissaRoutes from "../routes";

const RoutesComponent = () => {
    // const [isLogged, setIsLogged]  = useContext(AuthContext);
    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if (token) {
        //     setIsLogged(true);
        // }
    }, []);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path='/login/*' element={
                <PublicRoute>
                    {
                        <Routes>
                            <Route path="/*" element={<Login />} />
                        </Routes>
                    }
                </PublicRoute>
            } />

            {/* Privates Routes */}
            <Route path='/*' element={
                <PrivateRoute>
                    <SissaRoutes />
                </PrivateRoute>
            } />
        </Routes>
    )
}
export default RoutesComponent;