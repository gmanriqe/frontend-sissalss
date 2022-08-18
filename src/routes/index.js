import { Route, Routes, Navigate } from 'react-router-dom';
import { ROLE } from '../config';

// 1ero: Paquetes terceros
import jwtDecode from 'jwt-decode';

// 2do: Paquetes de mi propio proyecto
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import Clients from '../views/Customer';
import AddClient from "../views/Customer/AddCustomer";
import Quote from '../views/Quote';
import Staff from '../views/Staff';
import AddStaff from "../views/Staff/AddStaff";
import EditStaff from "../views/Staff/EditStaff";
import Dashboard from "../views/Dashboard";
import EditProfile from '../views/Profile/EditProfile';
import Page404 from "../views/Page404";
import Anauthorized from "../views/Anauthorized";

const SissaRoutes = () => {
    let token = localStorage.getItem('token')
    let { role } = jwtDecode(token)

    return (
        <>
            <div className='w-full flex body-bg'>
                <div className='flex flex-auto min-w-0 '>
                    <Sidebar />
                    <main className='flex flex-col flex-auto min-h-full min-w-0 relative z-10'>
                        <Header />
                        <div className='flex flex-col flex-auto min-h-0 relative z-10'>
                            <div className='h-full overflow-hidden'>
                                <Routes>
                                    <Route path="/" element={<Navigate to="/dashboard" />} />
                                    <Route path="/login" element={<Navigate to="/dashboard" />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/perfil" element={<EditProfile />} />
                                    <Route path="*" element={<Page404 />} />
                                    <Route path="/unauthorized" element={<Anauthorized />} />

                                    {/* ADMIN */}
                                    <Route path="/personal" element={(role === ROLE.ADMIN) ? (<Staff />) : (<Navigate to="/unauthorized" />)} />
                                    <Route path="/personal/nuevo" element={(role === ROLE.ADMIN) ? (<AddStaff />) : (<Navigate to="/unauthorized" />)} />
                                    <Route path="/personal/editar/:id" element={(role === ROLE.ADMIN) ? (<EditStaff />) : (<Navigate to="/unauthorized" />)} />

                                    {/*  CASHIER */}
                                    <Route path="/clientes" element={<Clients />} />
                                    <Route path="/clientes/nuevo" element={<AddClient />} />
                                    <Route path="/cita" element={<Quote />} />
                                </Routes>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            {/*<Footer/>*/}
        </>
    )
}

export default SissaRoutes;

