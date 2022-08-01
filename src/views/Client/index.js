import { useEffect, useState } from 'react'
import {
    createColumnHelper, flexRender, getCoreRowModel, useReactTable
} from '@tanstack/react-table'
import { APIListClient } from '../../api/clients.js'
import { CONFIG_HEADER } from '../../config/index.js'

const columnHelper = createColumnHelper()
const columns = [
    columnHelper.accessor('id', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('nombre', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('apellido', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('fecha_nacimiento', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('telefono', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('sexo', {
        cell: info => info.getValue(),
    }),
]

const Client = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        CONFIG_HEADER.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        APIListClient(CONFIG_HEADER, (response) => {
            setData(response.data)
        })
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <h1>Cliente</h1>
            <div className="overflow-x-auto relative">
                <table className='w-full table-fixed border-collapse border border-slate-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr className='border border-slate-300' key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr className='border border-slate-300' key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center gap-2">
                    <button
                        className="border rounded p-1"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                            className="border p-1 rounded w-16"
                        />
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div >
    )
}

export default Client