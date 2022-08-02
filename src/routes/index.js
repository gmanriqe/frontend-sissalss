// 1ero: Paquetes de terceros
import { useContext } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContent';
// 2do: Paquetes de mi propio proyecto
import { Layout1, Layout2 } from '../components/Layout';
import Clients from '../views/Client';
import AddClient from "../views/Client/AddClient";
import Quote from '../views/Quote';
import Login from '../views/Login';

const RoutesComponent = () => {
    const [isLogged] = useContext(AuthContext);

    return (
        <Routes>
            <Route element={<Layout1 />} >
                <Route path="/" element={isLogged ? (<Navigate to="/dashboard" />) : (<Navigate to="/login" />)} />
                <Route path="/clientes" element={isLogged ? (<Clients />) : (<Navigate to='/login' />)} />
                <Route path="/clientes/nuevo" element={isLogged ? (<AddClient />) : (<Navigate to='/login' />)} />
                <Route path="/cita" element={<Quote />} />
                <Route path="*" element={<div>404</div>} />
            </Route>
            <Route element={<Layout2 />} >
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    )
}
export default RoutesComponent;