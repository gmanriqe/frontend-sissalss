import PageHeader from '../../components/PageHeader';
import { APIListTypeDocument } from '../../api/all';
import { useEffect } from 'react';

const breadcrumbs = [{ names: 'Lista', link: '/personal' }, { names: 'Nuevo', link: '/personal/nuevo' }]
const AddStaff = () => {
    useEffect(() => {
        APIListTypeDocument((response) => {
            console.log(response)
        })
    }, [])

    return (
        <div className='main main-addclient'>
            <PageHeader title={'PERSONAL'} breadcrumbs={breadcrumbs} />
            <div className='mx-auto p-20 container'>
                <div className='card p-20 overflow-x-auto relative'>
                    <form className='grid grid-cols-2 gap-20' noValidate>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='nombres'>Nombres</label>
                            <input
                                id='nombres'
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='apellidos'>Apellidos</label>
                            <input
                                type='text'
                                className='form-control'
                                id='apellidos'
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='fecha-nacimiento'>Fecha de nacimiento</label>
                            <input
                                id='fecha-nacimiento'
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='tipo-documento'>Tipo documento</label>
                            <input
                                id='tipo-documento'
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='nro-documento'>Nro documento</label>
                            <input
                                id='nro-documento'
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='nro-telefono'>Teléfono</label>
                            <input
                                id='nro-telefono'
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='form-group col-span-2 md:col-span-1'>
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='form-group col-span-2 text-right'>
                            <button className='btn-rds'>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddStaff;