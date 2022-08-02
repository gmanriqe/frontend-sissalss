// 1ero: Paquetes de terceros
import { Outlet } from 'react-router-dom';
// 2do: Paquetes de mi propio proyecto
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

export const Layout1 = () => {
    return (
        <>
            <div className='w-full flex body-bg'>
                <div className='flex flex-auto min-w-0 '>
                    <Sidebar />
                    <main className='flex flex-col flex-auto min-h-full min-w-0 relative z-10'>
                        <Header/>
                        <div className='flex flex-col flex-auto min-h-0 relative z-10'>
                            <div className='h-full overflow-hidden'>
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
        <div className='w-full h-screen flex justify-center items-center'>
            <Outlet />
        </div>
    );
}