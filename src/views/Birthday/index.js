import { Link } from "react-router-dom";
import bgBirthday from '../../assets/images/theme/birthday_page.jpg'

const Birthday = () => {
    return (
        <div className='main main-clients'>
            <div
                className='page-header'
                style={{
                    backgroundImage: `url(${bgBirthday})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'left top',
                }}>
                <div className='mx-auto p-20 max-w-7xl'>
                    <nav className='page-breadcrumb'>
                        <ul>
                            <li><Link to='/cumpleanios'>Cumpleaños</Link></li>
                        </ul>
                    </nav>
                    <h1 className='text-3xl md:text-4xl font-extrabold mt-8'>Celebremos juntos.</h1>
                </div>
            </div>
            <div className='mx-auto p-20 max-w-7xl'>
                <div className="card p-20 overflow-x-auto relative">
                    <h2 className='text-2xl font-bold mb-7'>BÚSQUEDA</h2>
                    <form className='grid grid-cols-2 gap-20'>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='birth-date'>Fec. de nacimiento</label>
                            <input
                                id='birth-date'
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='customer'>Cliente</label>
                            <input
                                id='customer'
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='form-group col-span-2 text-right'>
                            <button type='submit' className='btn-rds' id='btn-search'>
                                <em className='material-icons animate-spin'>sync</em>
                                <strong>Buscar</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Birthday;