import { Route, Routes, Navigate } from 'react-router-dom';
// 2do: Paquetes de mi propio proyecto
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// 2do: Paquetes de mi propio proyecto
import Clients from '../views/Client';
import AddClient from "../views/Client/AddClient";
import Quote from '../views/Quote';
import Staff from '../views/Staff';
import AddStaff from "../views/Staff/AddStaff";
import EditStaff from "../views/Staff/EditStaff";
import Page404 from "../views/Page404";
import Dashboard from "../views/Dashboard";

const SissaRoutes = () => {
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
                                    <Route path="/personal" element={<Staff />} />
                                    <Route path="/personal/nuevo" element={<AddStaff />} />
                                    <Route path="/personal/editar/:id" element={<EditStaff />} />
                                    <Route path="/clientes" element={<Clients />} />
                                    <Route path="/clientes/nuevo" element={<AddClient />} />
                                    <Route path="/cita" element={<Quote />} />

                                    <Route path="*" element={<Page404 />} />
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

