import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const dataStorage = localStorage.getItem('staff')

const EditStaff = () => {
    const { id } = useParams()

    const [data, setData] = useState(JSON.parse(dataStorage))

    let filterData = data.filter(item => item.id === id)

    return (
        <div className='main main-edit-staff'>
            <div className='page-header'>
                <div className='mx-auto p-20 max-w-7xl '>
                    <nav className='page-breadcrumb'>
                        <ul>
                            <li><Link to='/personal'>Listar</Link></li>
                            <li><Link to=''>Editar</Link></li>
                        </ul>
                    </nav>
                    <h1 className='text-3xl md:text-4xl font-extrabold mt-8'>PERSONAL</h1>
                </div>
            </div>
            <div className='mx-auto p-20 max-w-7xl'>
                <div className='card p-20 overflow-x-auto relative'>
                    <form className='grid grid-cols-2 gap-20' noValidate>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='nombre'>Nombres</label>
                            <input
                                id='nombre'
                                type='text'
                                className='form-control'
                                defaultValue={filterData[0].first_name}
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='apellidos'>Apellidos</label>
                            <input
                                id='apellidos'
                                type='text'
                                className='form-control'
                                defaultValue={filterData[0].last_name}
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='fec-nacimiento'>Fec. Nacimiento</label>
                            <input
                                id='fec-nacimiento'
                                type='text'
                                className='form-control'
                                defaultValue={filterData[0].birth_date}
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='telefono'>Teléfono</label>
                            <input
                                id='telefono'
                                type='text'
                                className='form-control'
                                defaultValue={filterData[0].phone}
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                type='text'
                                className='form-control'
                                defaultValue={filterData[0].email}
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className='form-group col-span-2 text-right'>
                            <button type='submit' className='btn-rds'>Editar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditStaff