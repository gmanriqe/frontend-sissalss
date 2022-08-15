import { Link } from 'react-router-dom'
const Page404 = () => {
    return (
        <div className='main main-page404 flex items-center h-screen-widthout-nav'>
            <div className='mx-auto p-20 container'>
                <div className='max-w-640 m-auto'>
                    <h1 className='text-6xl font-dark font-bold'>404</h1>
                    <p className='text-2xl md:text-3xl font-light leading-normal'>¡Vaya! No hemos encontramos la página</p>
                    <p className='mb-10'>Ve a la página de inicio, encontrarás otras opciones.</p>
                    <Link to='/' className='btn-rds btn-secondary'>Ir al inicio</Link>
                </div>
            </div>
        </div>
    )
}
export default Page404;