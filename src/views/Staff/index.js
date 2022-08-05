import { Link } from 'react-router-dom'
const Staff = () => {
    return (
        <div className='main main-staff'>
            <div className='page-header'>
                <div className='mx-auto p-20 container '>
                    <nav className='page-breadcrumb'>
                        <ul>
                            <li><Link to='/personal'>Lista</Link></li>
                        </ul>
                    </nav>
                    <h1 className='text-3xl md:text-4xl font-extrabold mt-8'>PERSONAL</h1>
                </div>
            </div>
            <div className='mx-auto p-20 container'>
                <div className='flex justify-end mb-10'>
                    <Link to='/personal/nuevo' className='btn-rds'>Nuevo</Link>
                </div>
                <div className="card p-20 overflow-x-auto relative">
                    <table className='w-full table-fixed border-collapse border border-slate-400'>
                        
                        
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Staff;
