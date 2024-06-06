import { useForm, useWatch } from 'react-hook-form';
import Button from '../common/button';
import ReactDatePicker from 'react-datepicker';
import ReactSelect from 'react-select';
import { updateBorrowItem } from '../../services/borrow-items';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  returnedDate: yup.date().required(),
  condition: yup.string().required(),
});

const ReturnInventoryForm = ({ name, items, id, onSuccess }) => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      returnedDate: new Date(),
      condition: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await updateBorrowItem(id, {
        returnedDate:
          dayjs(returnedDate).toISOString() || dayjs().toISOString(),
        condition: data.condition,
      });

      onSuccess?.();
      toast.success('Berhasil mengembalikan barang');
    } catch (error) {
      console.log(error);
    }
  };

  const returnedDate = useWatch({
    control,
    name: 'returnedDate',
    defaultValue: new Date(),
  });

  return (
    <div className='bg-white p-6'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-2xl font-bold mb-4'>Return Inventory</h1>
        <div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Name<span className='text-red-600'>*</span>
            </span>
            <div className='text-xl font-bold'>{name}</div>
          </div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Items<span className='text-red-600'>*</span>
            </span>
            <div className='flex flex-col gap-2'>
              {items.map((item, index) => {
                return (
                  <div key={index} className='text-xl font-bold'>
                    {item.item?.name} ({item.quantity}x)
                  </div>
                );
              })}
            </div>
          </div>

          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Return Date<span className='text-red-600'>*</span>
            </span>
            <ReactDatePicker
              selected={returnedDate}
              onChange={(date) => setValue('returnedDate', date)}
              dateFormat='dd MMMM YYYY'
              className='w-full p-2 border border-gray-300 rounded-md'
            />

            {errors.returnedDate && (
              <span className='block text-red-600 mt-2'>
                This field is required
              </span>
            )}
          </div>

          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Condition<span className='text-red-600'>*</span>
            </span>
            <ReactSelect
              options={[
                {
                  label: 'Good',
                  value: 'good',
                },
                {
                  label: 'Bad',
                  value: 'bad',
                },
              ]}
              onChange={(value) => {
                setValue('condition', value.value);
              }}
            />
            {errors.condition && (
              <span className='text-red-600 mt-2'>This field is required</span>
            )}
          </div>

          <Button type='submit' className='w-full mt-3'>
            Return Inventory
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReturnInventoryForm;
