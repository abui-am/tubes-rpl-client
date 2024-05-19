import { useForm } from 'react-hook-form';
import Input from '../common/input';
import toast from 'react-hot-toast';
import Button from '../common/button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createItem, updateItem } from '../../services/item';

function FormCreateItem({ defaultValues, editId }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });
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
              Name<span className='text-red-600'>*</span>
            </span>
            <Input placeholder='Masukan nama barang' {...register('name')} />
          </div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Qty<span className='text-red-600'>*</span>
            </span>
            <Input
              type='number'
              placeholder='Masukan qty'
              {...register('quantity')}
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

FormCreateItem.propTypes = {
  defaultValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }),
  editId: PropTypes.string,
};

export default FormCreateItem;
