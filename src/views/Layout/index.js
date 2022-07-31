// 1ero: Paquetes de terceros
import { Outlet } from 'react-router-dom';
// 2do: Paquetes de mi propio proyecto
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

export const Layout1 = () => {
    return (
        <>
            <div className='w-full flex'>
                <div className='flex flex-auto min-w-0 '>
                    <Sidebar />
                    <main className='flex flex-col flex-auto min-h-full min-w-0 relative z-10'>
                        <Header/>
                        <div className='flex flex-col flex-auto min-h-0 relative z-10'>
                            <div className='flex flex-auto flex-col container z-10 h-full shadow-1 rounded-t-16 relative overflow-hidden'>
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export const Layout2 = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
}