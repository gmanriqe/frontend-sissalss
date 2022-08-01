// 1ero: Paquetes de terceros
import { useContext } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
// 2do: Paquetes de mi propio proyecto
import Client from '../views/Client';
import Quote from '../views/Quote';
import Login from '../views/Login';
import { Layout1, Layout2 } from '../views/Layout';
import { AuthContext } from '../context/AuthContent';

const RoutesComponent = () => {
    const [isLogged, setIsLogged] = useContext(AuthContext);

    return (
        <Routes>
            <Route element={<Layout1 />} >

                <Route path="/clientes" element={isLogged ? (<Client />) : (<Navigate to='/login'/>)} />
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