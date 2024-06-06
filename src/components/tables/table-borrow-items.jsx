import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { deleteUser } from '../../services/login';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import Button from '../common/button';
import toast from 'react-hot-toast';
import Input from '../common/input';
import { getBorrowItems } from '../../services/borrow-items';
import dayjs from 'dayjs';
import ReturnInventoryForm from '../forms/form-return-inventory';

const columnHelper = createColumnHelper();

function getColumns({ onClickReturn }) {
  return [
    columnHelper.display({
      cell: (info) => info.row.index + 1,
      footer: '',
      header: '#',
      size: 10,
    }),
    columnHelper.accessor('borrower', {
      cell: (info) => (
        <div>
          <div className='text-neutral-900 font-bold text-sm'>
            {info.getValue()?.name || '-'}
          </div>
          <div className='text-neutral-700 text-xs'>
            {info.getValue()?.status || '-'}
          </div>
        </div>
      ),
      footer: (info) => info.column.id,
      header: 'Name',
    }),

    columnHelper.accessor('items', {
      cell: (info) => {
        const items = info.getValue();
        return (
          <div>
            {items.map((item) => (
              <div key={item.id} className='flex gap-2'>
                <span className='text-neutral-700 text-sm'>
                  {item?.item?.name}({item?.quantity})
                </span>
              </div>
            ))}
          </div>
        );
      },
      footer: (info) => info.column.id,
      header: 'Items',
    }),
    columnHelper.accessor('description', {
      cell: (info) => (
        <span className='text-neutral-700'>{info.getValue() || '-'}</span>
      ),
      footer: (info) => info.column.id,
      header: 'Description',
    }),
    columnHelper.accessor('borrowDate', {
      cell: (info) => (
        <span className='text-neutral-700'>{info.getValue() || '-'}</span>
      ),
      footer: (info) => info.column.id,
      header: 'Borrow Date',
    }),

    columnHelper.accessor('returnBefore', {
      cell: (info) => (
        <span className='text-neutral-700'>{info.getValue() || '-'}</span>
      ),
      footer: (info) => info.column.id,
      header: 'Return Before Date',
    }),

    columnHelper.accessor('returnedDate', {
      cell: (info) => (
        <span className='text-neutral-700'>{info.getValue() || '-'}</span>
      ),
      footer: (info) => info.column.id,
      header: 'Returned Date',
    }),

    columnHelper.display({
      cell: (info) => (
        <div className='flex gap-2'>
          {info.row.original.isReturned ? (
            <span className='text-green-500'>Returned</span>
          ) : (
            <Button onClick={() => onClickReturn(info.row.original.id)}>
              Return
            </Button>
          )}
        </div>
      ),
      footer: '',
      header: 'Action',
      size: 20,
    }),
  ];
}
function TableBorrowItems() {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [returnItemId, setReturnItemId] = useState(null);
  const [search, setSearch] = useState('');
  const columns = getColumns({
    onClickReturn: (id) => {
      setReturnItemId(id);
    },
  });

  async function fetchTableData() {
    try {
      const res = await getBorrowItems({
        search,
      });
      setData(
        res?.data?.map((item) => ({
          borrower: item.borrower,
          id: item.id,
          items: item.items,
          borrowDate: dayjs(item.createdAt).format('DD MMM YYYY, HH:mm'),
          description: item.description,
          returnedDate:
            item.status === 'returned'
              ? dayjs(item.returnedDate).format('DD MMM YYYY, HH:mm')
              : '-',
          isReturned: item.status === 'returned',
          returnBefore: dayjs(item.returnBefore).format('DD MMM YYYY, HH:mm'),
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

  const { items, borrower } =
    table.getRowModel().rows.find((row) => row.original.id === returnItemId)
      ?.original || {};

  useEffect(() => {
    fetchTableData();
  }, [search]);
  return (
    <div className='bg-white shadow-lg rounded-lg'>
      {!!returnItemId && (
        <ModalReturnItem
          returnItemId={returnItemId}
          name={borrower.name}
          items={items}
          onRequestClose={() => {
            fetchTableData();
            setReturnItemId(null);
          }}
        />
      )}
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
              Apakah anda yakin ingin menghapus item ini?
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
          <Link to='/borrow-items/create'>
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
              Borrow New Items
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

const ModalReturnItem = ({ returnItemId, name, items, onRequestClose }) => {
  return (
    <ReactModal
      isOpen={!!returnItemId}
      onRequestClose={() => {
        onRequestClose();
      }}
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
      <ReturnInventoryForm
        onSuccess={onRequestClose}
        id={returnItemId}
        name={name}
        items={items}
      />
    </ReactModal>
  );
};

export default TableBorrowItems;
