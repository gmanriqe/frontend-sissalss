import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    createColumnHelper, flexRender, getCoreRowModel, useReactTable
} from '@tanstack/react-table'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { APIListClient } from '../../api/customers.js'
import { CONFIG_HEADER } from '../../config/index.js'
// Redux RTK
import { listCustomer } from '../../redux/slice/customer/customerSlice'
import { useSelector, useDispatch } from 'react-redux'

const MySwal = withReactContent(Swal);
const columnHelper = createColumnHelper()
const columns = [
    columnHelper.accessor('id', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('first_name', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('last_name', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('birthday', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('telephone', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('sex', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('number_document', {
        cell: info => info.getValue(),
    }),
]

const handleSwalRemove = (evt, ID) => {
    MySwal.fire({
        text: `ID = ${ID}. DESEA ELIMINAR ESTE REGISTRO?.`,
        icon: 'warning',
        confirmButtonText: 'OK',
        showCloseButton: true, // icon cerrar
        allowOutsideClick: false, // click afuera no cierra
        allowEscapeKey: true, // keyup esc cierra
        customClass: { // nueva clase en el moda
            container: 'swal-content',
        },
    }).then((result) => {
        if(result.value) {
            console.log(result)
            // fetchin api
        }
    })
}

const Clients = () => {
    const [data, setData] = useState([])
    // initial the dispatch here
    const dispatch = useDispatch();


    useEffect(() => {
        CONFIG_HEADER.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        APIListClient(CONFIG_HEADER, (response) => {
            let data = response.data.data

            if (data.length > 0) {
                setData(JSON.parse(data))
                dispatch(listCustomer(data))
            }

        })
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className='main main-clients'>
            <div className='page-header'>
                <div className='mx-auto p-20 max-w-7xl'>
                    <nav className='page-breadcrumb'>
                        <ul>
                            <li><Link to='/clientes'>Clientes</Link></li>
                        </ul>
                    </nav>
                    <h1 className='text-3xl md:text-4xl font-extrabold mt-8'>CLIENTES</h1>
                </div>
            </div>
            <div className='mx-auto p-20 max-w-7xl'>
                <div className='flex justify-end mb-10'>
                    <Link to='/clientes/nuevo' className='btn-rds'>Nuevo</Link>
                </div>
                <div className="card p-20 overflow-x-auto relative">
                    <table className='w-full table-fixed border-collapse border border-slate-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr className='border border-slate-300' key={headerGroup.id}>
                                    <th className='p-8'>#</th>
                                    <th className='p-8'>NOMBRES</th>
                                    <th className='p-8'>APELLIDOS</th>
                                    <th className='p-8'>FECHA DE NACIMIENTO</th>
                                    <th className='p-8'>EMAIL</th>
                                    <th className='p-8'>TELÉFONO</th>
                                    <th className='p-8'>SEXO</th>
                                    <th className='p-8'>NRO DOCUMENTO</th>
                                    <th className='p-8'></th>
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {(table.getRowModel().rows.length > 0)
                                ? table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className='border border-slate-300'>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className='text-sm py-4 px-6 text-center'>
                                                {cell.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                            </td>
                                        ))}
                                        <td>
                                            <div className='flex flex-inline justify-center'>
                                                <Link to={`/clientes/editar/${row.original.id}`} className='btn-opt'><span className="material-icons">open_in_new</span></Link>
                                                <button className='btn-opt' onClick={(evt) => handleSwalRemove(evt, row.original.id)}><span className="material-icons">delete</span></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                : <tr><td colSpan={table.getHeaderGroups()[0].headers.length}>No hay registros</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Clients