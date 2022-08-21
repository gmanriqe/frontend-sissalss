import { Route, Routes, Navigate } from 'react-router-dom';

// 1ero: Paquetes tercero

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
import Birthday from '../views/Birthday';

import { useIsAdmin } from '../hooks/index'



const SissaRoutes = () => {
    const isAdmin = useIsAdmin()

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
                                    <Route path="/personal" element={(isAdmin) ? (<Staff />) : (<Navigate to="/unauthorized" />)} />
                                    <Route path="/personal/nuevo" element={(isAdmin) ? (<AddStaff />) : (<Navigate to="/unauthorized" />)} />
                                    <Route path="/personal/editar/:id" element={(isAdmin) ? (<EditStaff />) : (<Navigate to="/unauthorized" />)} />

                                    {/*  CASHIER */}
                                    <Route path="/clientes" element={<Clients />} />
                                    <Route path="/clientes/nuevo" element={<AddClient />} />
                                    <Route path="/cita" element={<Quote />} />
                                    <Route path="/cumpleanios" element={<Birthday />} />
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

