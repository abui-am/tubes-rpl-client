import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../../services/login';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import Button from '../common/button';
import toast from 'react-hot-toast';
import Input from '../common/input';

const columnHelper = createColumnHelper();

const roleLabel = {
  admin: 'Admin',
  superadmin: 'Super Admin',
};
function getColumns({ onClickEdit, onClickDelete }) {
  return [
    columnHelper.display({
      cell: (info) => info.row.index + 1,
      footer: '',
      header: '#',
      size: 10,
    }),
    columnHelper.accessor('name', {
      cell: (info) => (
        <span className='text-neutral-900 font-bold'>
          {info.getValue() || '-'}
        </span>
      ),
      footer: (info) => info.column.id,
      header: 'Name',
    }),
    columnHelper.accessor('email', {
      cell: (info) => (
        <span className='text-neutral-700'>{info.getValue() || '-'}</span>
      ),
      footer: (info) => info.column.id,
      header: 'Email',
    }),
    columnHelper.accessor('role', {
      cell: (info) => (
        <span className='text-neutral-700'>{info.getValue()}</span>
      ),
      footer: (info) => info.column.id,
      header: 'Role',
    }),
    columnHelper.display({
      cell: (info) => (
        <div className='flex gap-3'>
          <button
            className='p-1 rounded-md border border-neutral-300'
            onClick={() => onClickEdit(info.row.original.id)}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.66659 14C2.71973 14.0064 2.77345 14.0064 2.82659 14L5.49326 13.3333C5.61156 13.3052 5.71991 13.2453 5.80659 13.16L13.9999 4.94C14.2483 4.69018 14.3877 4.35224 14.3877 4C14.3877 3.64775 14.2483 3.30981 13.9999 3.06L12.9466 2C12.8228 1.87603 12.6757 1.77768 12.5138 1.71058C12.352 1.64348 12.1785 1.60895 12.0033 1.60895C11.828 1.60895 11.6545 1.64348 11.4927 1.71058C11.3308 1.77768 11.1838 1.87603 11.0599 2L2.86659 10.1933C2.78045 10.2804 2.71843 10.3884 2.68659 10.5067L2.01993 13.1733C1.99597 13.2596 1.98962 13.3498 2.00128 13.4386C2.01294 13.5273 2.04235 13.6128 2.08777 13.69C2.13319 13.7671 2.19368 13.8343 2.26564 13.8876C2.33759 13.9409 2.41954 13.9791 2.50659 14C2.55973 14.0064 2.61345 14.0064 2.66659 14ZM11.9999 2.94L13.0599 4L11.9999 5.06L10.9466 4L11.9999 2.94ZM3.93993 11.0067L9.99993 4.94L11.0599 6L4.99326 12.0667L3.58659 12.4133L3.93993 11.0067Z'
                fill='#464F60'
              />
            </svg>
          </button>
          <button
            className='text-red-500'
            onClick={() => onClickDelete(info.row.original.id)}
          >
            Delete
          </button>
        </div>
      ),
      footer: '',
      header: 'Action',
    }),
  ];
}
function TableAccount() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');
  const columns = getColumns({
    onClickDelete: (id) => setDeleteId(id),
    onClickEdit: (id) => {
      navigate(`/account/${id}/edit`);
    },
  });

  async function fetchTableData() {
    try {
      const res = await getUsers({
        search,
      });
      setData(
        res?.data?.map((item) => ({
          name: item.name,
          email: item.email,
          role: roleLabel[item.role?.name],
          id: item.id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDelete(id) {
    try {
      await deleteUser(id);
      setDeleteId(null);
      await fetchTableData();

      toast.success('Berhasil menghapus user');
    } catch (error) {
      console.log(error);
    }
  }

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
  });

  useEffect(() => {
    fetchTableData();
  }, [search]);
  return (
    <div className='bg-white shadow-lg rounded-lg'>
      {!!deleteId && (
        <ReactModal
          isOpen={!!deleteId}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              zIndex: 1000,
            },
            content: {
              width: '400px',
              margin: 'auto',
              borderRadius: '8px',
              border: 'none',
              padding: '0',
              height: 'fit-content',
            },
          }}
        >
          <div className='bg-white p-6'>
            <h2 className='mb-4'>
              Apakah anda yakin ingin menghapus user ini?
            </h2>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button onClick={() => handleDelete(deleteId)}>Delete</Button>
            </div>
          </div>
        </ReactModal>
      )}
      <div className='px-7 py-3 flex justify-between'>
        <div className='flex-1'>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            Icon={
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M10.6821 11.7458C9.66576 12.5361 8.38866 13.0067 7.00167 13.0067C3.68704 13.0067 1 10.3189 1 7.00335C1 3.68779 3.68704 1 7.00167 1C10.3163 1 13.0033 3.68779 13.0033 7.00335C13.0033 8.39059 12.533 9.66794 11.743 10.6845L14.7799 13.7186C15.0731 14.0115 15.0734 14.4867 14.7806 14.7799C14.4878 15.0731 14.0128 15.0734 13.7196 14.7805L10.6821 11.7458ZM11.5029 7.00335C11.5029 9.49002 9.48765 11.5059 7.00167 11.5059C4.5157 11.5059 2.50042 9.49002 2.50042 7.00335C2.50042 4.51668 4.5157 2.50084 7.00167 2.50084C9.48765 2.50084 11.5029 4.51668 11.5029 7.00335Z'
                  fill='#A3A3A3'
                />
              </svg>
            }
            placeholder='Search'
            className='max-w-[320px]'
          />
        </div>
        <div>
          <Link to='/account/create'>
            <Button className='flex gap-2'>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.74999 2.75003C8.74999 2.33582 8.4142 2.00003 7.99999 2.00003C7.58578 2.00003 7.24999 2.33582 7.24999 2.75003V7.25H2.75C2.33579 7.25 2 7.58578 2 8C2 8.41421 2.33579 8.75 2.75 8.75H7.24999L7.25 13.25C7.25 13.6642 7.58579 14 8 14C8.41421 14 8.75 13.6642 8.75 13.25L8.74999 8.75H13.25C13.6642 8.75 14 8.41421 14 8C14 7.58578 13.6642 7.25 13.25 7.25H8.74999V2.75003Z'
                  fill='white'
                />
              </svg>
              Register Account
            </Button>
          </Link>
        </div>
      </div>
      <table className='w-full table-auto '>
        <thead className='border-b'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='p-5 text-left first:pl-8 last:pl-8'
                  style={{ width: `${header.getSize()}px` }}
                >
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
            <tr key={row.id} className='even:bg-neutral-50'>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='p-5 first:pl-8 last:pl-8'
                  style={{ width: `${cell.column.getSize()}px` }}
                >
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
