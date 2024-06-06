import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Button from '../common/button';
import ReactDatePicker from 'react-datepicker';
import ReactSelect from 'react-select';
import { updateBorrowItem } from '../../services/borrow-items';

const ReturnInventoryForm = ({ name, items, id }) => {
  const { handleSubmit, reset, setValue, getValues, control } = useForm({});

  const onSubmit = async (data) => {
    updateBorrowItem(id, {
      returnedDate: data.returnedDate,
      condition: data.condition,
    });

    reset();
  };

  const returnedDate = useWatch({
    control,
    name: 'returnedDate',
  });

  return (
    <div className='bg-white p-6'>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {items.map((item, index) => (
              <div key={index} className='flex justify-between'>
                <span className='text-xl font-bold'>{item.name}</span>
                <span>{item.quantity}</span>
              </div>
            ))}
          </div>

          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Return Date<span className='text-red-600'>*</span>
            </span>
            <ReactDatePicker
              selected={returnedDate}
              onChange={(date) => setValue('returnedDate', date)}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
            />
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
