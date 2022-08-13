// 1ero: Paquetes de terceros
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// 2do: Paquetes de mi propio proyecto
import { Layout1, Layout2 } from '../components/Layout';
import Clients from '../views/Client';
import AddClient from "../views/Client/AddClient";
import Quote from '../views/Quote';
import Login from '../views/Login';
import Staff from '../views/Staff';
import AddStaff from "../views/Staff/AddStaff";
import EditStaff from "../views/Staff/EditStaff";
import Page404 from "../views/Page404";
import Dashboard from "../views/Dashboard";

const RoutesComponent = () => {
    const isLogged = useSelector(state => state.auth.isAuthenticated);

    return (
        <Routes>
            <Route element={<Layout1 />} >
                <Route path="/" element={isLogged ? (<Navigate to="/dashboard" />) : (<Navigate to="/login" />)} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/personal" element={isLogged ? (<Staff />) : (<Navigate to='/login' />)} />
                <Route path="/personal/nuevo" element={isLogged ? (<AddStaff />) : (<Navigate to='/login' />)} />
                <Route path="/personal/editar/:id" element={isLogged ? (<EditStaff />) : (<Navigate to='/login' />)} />
                <Route path="/clientes" element={isLogged ? (<Clients />) : (<Navigate to='/login' />)} />
                <Route path="/clientes/nuevo" element={isLogged ? (<AddClient />) : (<Navigate to='/login' />)} />
                <Route path="/cita" element={<Quote />} />

                <Route path="*" element={<Page404 />} />
                {/* <Route path="*" element={<div>404</div>} /> */}
            </Route>
            <Route element={<Layout2 />} >
                <Route path="/login" element={isLogged ? (<Navigate to='/dashboard' />) : <Login />} />
            </Route>
        </Routes>
    )
}
export default RoutesComponent;