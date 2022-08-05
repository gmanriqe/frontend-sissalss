import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    createColumnHelper, flexRender, getCoreRowModel, useReactTable
} from '@tanstack/react-table'
import { staff } from '../../mock/Staff'

const columnHelper = createColumnHelper()
const columns = [
    columnHelper.accessor('id', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('fisrt_name', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('last_name', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('birth_date', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('doc_number', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('phone', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
        cell: info => info.getValue(),
    })
]

const Staff = () => {
    const [data, setData] = useState(staff)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handlerXXX = (evt, ID) => {
        const $opts = document.querySelector(`div[data-id=elem-${ID}`)
        $opts.classList.toggle('show')
    }

    window.handlerXXX = handlerXXX
    return (
        <div className='main main-staff'>
            <div className='page-header'>
                <div className='mx-auto p-20 max-w-7xl '>
                    <nav className='page-breadcrumb'>
                        <ul>
                            <li><Link to='/personal'>Lista</Link></li>
                        </ul>
                    </nav>
                    <h1 className='text-3xl md:text-4xl font-extrabold mt-8'>PERSONAL</h1>
                </div>
            </div>
            <div className='mx-auto p-20 max-w-7xl'>
                <div className='flex justify-end mb-10'>
                    <Link to='/personal/nuevo' className='btn-rds'>Nuevo</Link>
                </div>
                <div className="card p-20 overflow-hidden">
                    <div className='overflow-x-auto relative'>
                        <table className='w-full border-collapse border border-slate-400'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr className='border border-slate-300' key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} className='text-sm py-3 px-6 whitespace-nowrap'>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        ))}
                                        <th></th>
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className='text-sm py-4 px-6' style={{ textAlign: 'center' }}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                        <td>
                                            <div className='table-opts' >
                                                <button className='table-opts__icon' onClick={(evt) => handlerXXX(evt, row.id)}>
                                                    <span className="material-icons align-middle">more_vert</span>
                                                </button>
                                                <div className='table-opts__links flex flex-col' data-id={`elem-${row.id}`}>
                                                    <Link to={`/personal/editar/${row.id}`}>Editar</Link>
                                                    <Link to={`/personal/eliminar/${row.id}`}>Eliminar</Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Staff;
