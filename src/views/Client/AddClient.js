import { Link } from 'react-router-dom'
const AddClient = () => {
    return (
        <div className='main main-addclient'>
            <div className='page-header'>
                <div className='mx-auto p-20 container '>
                    <nav className='page-breadcrumb'>
                        <ul>
                            <li><Link to='/clientes'>Clientes</Link></li>
                            <li><Link to='/clientes/nuevo'>Nuevo</Link></li>
                        </ul>
                    </nav>
                    <h1 className='text-3xl md:text-4xl font-extrabold mt-8'>NUEVO CLIENTE</h1>
                </div>
            </div>
            <div className='mx-auto p-20 container'>
                <div className="card p-20 overflow-x-auto relative">
                    <form className='grid grid-cols-2 gap-20'>
                        <div className="form-group col-span-2 md:col-span-1">
                            <label htmlFor="nombre">Nombres</label>
                            <input type="text" className="form-control" id="nombre" name='first_name'/>
                        </div>
                        <div className="form-group col-span-2 md:col-span-1">
                            <label htmlFor="apellido">Apellidos</label>
                            <input type="text" className="form-control" id="apellido" name='last_name'/>
                        </div>
                        <div className="form-group col-span-2 md:col-span-1">
                            <label htmlFor="tipo-documento">Tipo documento</label>
                            <select className="form-control" id="tipo-documento" name='type_document'></select>
                        </div>
                        <div className="form-group col-span-2 md:col-span-1">
                            <label htmlFor="nro-document">Nro. documento</label>
                            <input type="text" className="form-control" id="nro-document" />
                        </div>
                        <div className="form-group col-span-2 md:col-span-1">
                            <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                            <input type="date" className="form-control" id="fecha_nacimiento" name='birth_date' />
                        </div>
                        <div className="form-group col-span-2 md:col-span-1">
                            <label htmlFor="telefono">Teléfono</label>
                            <input type="text" className="form-control" id="telefono" name='phone'/>
                        </div>
                        <div className="form-group col-span-2 md:col-span-1">
                            <label htmlFor="correo">Email</label>
                            <input type="email" className="form-control" id="correo" name='email'/>
                        </div>
                        <div className="form-group col-span-2 md:col-span-1">
                            <label htmlFor="ocupacion">Ocupación</label>
                            <select className="form-control" id="ocupacion" name='occupation'></select>
                        </div>
                        {/* <div className="form-group col-span-2 md:col-span-1">
                            <label>Sexo</label>
                            <label htmlFor="masculino">Masculino<input type="radio" className="form-control" id="masculino" name='sex' /></label>
                            <label htmlFor="femenino">Femenino<input type="radio" className="form-control" id="femenino" name='sex' /></label>
                        </div> */}
                        <div className="form-group col-span-2 md:col-span-1">
                            <label htmlFor='observacion'>Observacion</label>
                            <textarea type="text" className="form-control" id="observacion" name='observation'></textarea>
                        </div>
                        <div className="form-group col-span-2 text-right">
                            <button type='submit' className='btn-rds'>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddClient;