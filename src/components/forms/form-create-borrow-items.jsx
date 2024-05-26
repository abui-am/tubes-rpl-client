import { useForm } from 'react-hook-form';
import Input from '../common/input';
import toast from 'react-hot-toast';
import Button from '../common/button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createItem, updateItem } from '../../services/item';

function FormCreateBorrowItems({ defaultValues, editId }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Borrower <span className='text-red-600'>*</span>
            </span>
            <select
              {...register('borrowerId')}
              className='border border-gray-300 rounded w-full p-2'
            >
              <option value='1'>Borrower 1</option>
              <option value='2'>Borrower 2</option>
              <option value='3'>Borrower 3</option>
            </select>
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
