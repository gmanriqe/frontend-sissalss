// 1ero: Paquetes de terceros
import { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContent';
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
    const [isLogged, setIsLogged]  = useContext(AuthContext);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogged(true);
        }
    }, []);

    return (
        <Routes>
            {
                isLogged ? (
                    <Route element={<Layout1 />} >
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/login" element={<Navigate to="/dashboard" />} />

                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/personal" element={<Staff />} />
                        <Route path="/personal/nuevo" element={<AddStaff />} />
                        <Route path="/personal/editar/:id" element={<EditStaff />} />
                        <Route path="/clientes" element={<Clients />} />
                        <Route path="/clientes/nuevo" element={<AddClient />} />
                        <Route path="/cita" element={<Quote />} />

                        <Route path="*" element={<Page404 />} />
                        {/* <Route path="*" element={<div>404</div>} /> */}
                    </Route>
                ) : (
                    <Route element={<Layout2 />} >
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Route>
                )
            }
        </Routes>
    )
}
export default RoutesComponent;