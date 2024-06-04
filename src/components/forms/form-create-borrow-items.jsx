import { useForm } from 'react-hook-form';
import Input from '../common/input';
import toast from 'react-hot-toast';
import Button from '../common/button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createItem, updateItem } from '../../services/item';
import CreatableSelect from 'react-select/creatable';
import { useEffect, useState } from 'react';
import { getBorrower } from '../../services/borrower';
import ReactModal from 'react-modal';
import FormCreateBorrower from './form-create-borrower';

function FormCreateBorrowItems({ defaultValues, editId }) {
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues,
  });

  const [options, setOptions] = useState([]);

  const [borrowerName, setBorrowerName] = useState('');
  async function fetchBorrowers() {
    const res = await getBorrower();
    setOptions(res.data.map((item) => ({ value: item.id, label: item.name })));
  }
  useEffect(() => {
    fetchBorrowers();
  }, []);

  const items = [];
  const navigate = useNavigate();
  const isEditMode = !!editId;
  async function onSubmit(data) {
    try {
      if (isEditMode) {
        await updateItem(editId, {
          name: data.name,
          quantity: +data.quantity,
        });
      } else {
        await createItem({
          name: data.name,
          quantity: +data.quantity,
        });
      }

      reset();
      navigate('/items');
      toast.success('Berhasil membuat items');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-white p-6'>
      <ReactModal
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
        isOpen={!!borrowerName}
        parentSelector={() => document.body}
        onRequestClose={() => setBorrowerName('')}
      >
        <FormCreateBorrower
          defaultValues={{
            name: borrowerName,
          }}
          onSave={() => {
            setBorrowerName('');
            fetchBorrowers();
          }}
        />
      </ReactModal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Borrower <span className='text-red-600'>*</span>
            </span>
            <CreatableSelect
              onCreateOption={(inputValue) => {
                setBorrowerName(inputValue);
              }}
              isClearable
              value={getValues('borrower')}
              options={options}
              onChange={(value) => {
                setValue('borrower', value);
              }}
            />
          </div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Items <span className='text-red-600'>*</span>
            </span>

            <div className='border border-gray-300 rounded w-full p-2'>
              {/* Nested Form */}
              {items.map((item, index) => (
                <div key={index} className='flex gap-2'>
                  <select
                    {...register(`items.${index}.itemId`)}
                    className='border border-gray-300 rounded w-full p-2'
                  >
                    <option value='1'>Item 1</option>
                    <option value='2'>Item 2</option>
                    <option value='3'>Item 3</option>
                  </select>
                  <Input
                    type='number'
                    placeholder='Masukan qty'
                    {...register(`items.${index}.quantity`)}
                  />
                </div>
              ))}
            </div>

            <Button
              type='button'
              onClick={() => {
                reset({
                  items: [
                    ...items,
                    {
                      itemId: '',
                      quantity: 0,
                    },
                  ],
                });
              }}
              className='mt-2'
            >
              Add Item
            </Button>
          </div>

          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Borrow Date <span className='text-red-600'>*</span>
            </span>
            <Input
              placeholder='Masukan tanggal peminjaman'
              {...register('borrowDate')}
            />
          </div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Description <span className='text-red-600'>*</span>
            </span>
            <Input
              placeholder='Masukan deskripsi'
              {...register('description')}
            />
          </div>

          <Button type='submit' className='w-full mt-3'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

FormCreateBorrowItems.propTypes = {
  defaultValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }),
  editId: PropTypes.string,
};

export default FormCreateBorrowItems;
