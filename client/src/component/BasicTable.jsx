import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import mData from '../../data.json';
import { useMemo, useState } from 'react';

const BasicTable = () => {
  /**
   * {
    "id": 1,
    "first_name": "Ariela",
    "last_name": "Waterfield",
    "email": "awaterfield0@yandex.ru",
    "gender": "Female",
    "date": "6/26/2023"
  },
   */

  const data = useMemo(() => mData, []);

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      footer: 'ID',
    },
    {
      header: 'Name',
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    },
    // {
    //   header: 'First Name',
    //   accessorKey: 'first_name',
    //   footer: 'ID',
    // },
    // {
    //   header: 'Last Name',
    //   accessorKey: 'last_name',
    //   footer: 'ID',
    // },
    {
      header: 'Email',
      accessorKey: 'email',
      footer: 'ID',
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
      footer: 'ID',
    },
    {
      header: 'Date',
      accessorKey: 'date',
      footer: 'ID',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => info.getValue(),
      footer: 'ID',
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="w3-container">
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table className="w3-table-all">
        {/* Display Header */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}

                  {
                    // Sorting
                    { asc: '⬆️', desc: '⬇️' }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* BODY */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* FOOTER */}
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div>
        <button onClick={() => table.setPageIndex(0)}>First Page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Prev Page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last Page
        </button>
      </div>
    </div>
  );
};
export default BasicTable;
