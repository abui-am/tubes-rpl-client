import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { getUsers } from '../../services/login';
const columnHelper = createColumnHelper();

const roleLabel = {
  admin: 'Admin',
  superadmin: 'Super Admin',
};
const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('role', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];
function TableAccount() {
  const [data, setData] = useState([]);
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getUsers();
        setData(
          res?.data?.map((item) => ({
            name: item.name,
            email: item.email,
            role: roleLabel[item.role?.name],
          }))
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <table className='w-full table-auto'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='border'>
              {headerGroup.headers.map((header) => (
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='border'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableAccount;
