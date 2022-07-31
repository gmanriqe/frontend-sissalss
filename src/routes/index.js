// 1ero: Paquetes de terceros
import { Route, Routes } from 'react-router-dom';

// 2do: Paquetes de mi propio proyecto
import Client from '../views/Client';
import Quote from '../views/Quote';
import Login from '../views/Login';
import { Layout1, Layout2 } from '../views/Layout';

const RoutesComponent = () => (
    <Routes>
        <Route element={<Layout1 />} >
            <Route path="/cliente" element={<Client />} />
            <Route path="/cita" element={<Quote />} />
            <Route path="*" element={<div>404</div>} />
        </Route>
        <Route element={<Layout2 />} >
            <Route path="/login" element={<Login />} />
        </Route>
    </Routes>
)
export default RoutesComponent;