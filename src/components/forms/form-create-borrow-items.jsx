import { useForm, useWatch } from 'react-hook-form';
import Input from '../common/input';
import toast from 'react-hot-toast';
import Button from '../common/button';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../../services/item';
import CreatableSelect from 'react-select/creatable';
import { useEffect, useState } from 'react';
import { getBorrower } from '../../services/borrower';
import ReactModal from 'react-modal';
import FormCreateBorrower from './form-create-borrower';
import ReactSelect from 'react-select';
import ReactDatePicker from 'react-datepicker';
import Cookies from 'js-cookie';
import { createBorrowItem } from '../../services/borrow-items';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    borrower: yup
      .object()
      .shape({
        value: yup.string().typeError('Must be string').required('Required'),
        label: yup.string().typeError('Must be string').required('Required'),
      })
      .required(),
    items: yup.array().of(
      yup.object().shape({
        itemId: yup
          .object()
          .shape({
            value: yup
              .string()
              .typeError('Must be string')
              .required('Required'),
            label: yup
              .string()
              .typeError('Must be string')
              .required('Required'),
          })
          .required('Required'),
        quantity: yup.number().typeError('Must be number').required('Required'),
      })
    ),
    returnBefore: yup.date().typeError('Must be date').required('Required'),
    description: yup.string().typeError('Must be string'),
  })
  .required();

function FormCreateBorrowItems({ defaultValues }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      borrower: null,
      items: [
        {
          itemId: null,
          quantity: null,
        },
      ],
      returnBefore: new Date(),
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const [options, setOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);

  const [borrowerName, setBorrowerName] = useState('');
  async function fetchBorrowers() {
    const res = await getBorrower();
    setOptions(
      res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    );
  }
  useEffect(() => {
    fetchBorrowers();
  }, []);

  async function fetchItems() {
    const res = await getItems();
    setItemOptions(
      res.data.map((item) => ({
        value: item.id,
        label: item.name + ' (' + item.quantity + ' left)',
      }))
    );
  }
  useEffect(() => {
    fetchItems();
  }, []);

  const items = useWatch({ name: 'items', control: control });
  const borrower = useWatch({
    name: 'borrower',
    defaultValue: null,
    control: control,
  });

  const returnBefore = useWatch({
    name: 'returnBefore',
    defaultValue: new Date(),
    control: control,
  });
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const items = data.items.map((item) => ({
        itemId: +item.itemId.value,
        quantity: +item.quantity,
      }));

      const user = JSON.parse(Cookies.get('user'));

      const userId = user.id;

      await createBorrowItem({
        userId: userId,
        borrowerId: +data.borrower.value,
        items,
        returnBefore: dayjs(data.returnBefore).toISOString(),
        description: data.description,
      });
      toast.success('Borrower Item created successfully');
      reset();
      navigate('/borrow-items');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create Borrower Item');
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
              options={options}
              onChange={(value) => {
                setValue('borrower', value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              value={borrower}
            />

            {errors.borrower && (
              <span className='text-red-600 block mt-2'>
                {errors.borrower.message}
              </span>
            )}
          </div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Items <span className='text-red-600'>*</span>
            </span>

            {/* Nested Form */}
            {items.map((item, index) => (
              <div
                key={index}
                className='border border-neutral-300 p-4 rounded-xl mb-4 relative'
              >
                {index >= 1 && (
                  <button
                    type='button'
                    onClick={() => {
                      const newItems = items.filter((_, i) => i !== index);
                      setValue('items', newItems, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    className='absolute top-2 right-2 text-red-600'
                  >
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z'
                        fill='#888888'
                      />
                    </svg>
                  </button>
                )}

                <div className='mb-3'>
                  <span className='block mb-2 text-left'>
                    Item <span className='text-red-600'>*</span>
                  </span>
                  <ReactSelect
                    options={itemOptions}
                    value={getValues(`items.${index}.itemId`)}
                    onChange={(value) => {
                      setValue(`items.${index}.itemId`, value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                  {errors.items &&
                    errors.items[index] &&
                    errors.items[index].itemId && (
                      <span className='text-red-600 block mt-2'>
                        {errors.items[index].itemId.message}
                      </span>
                    )}
                </div>

                <div className='mb-3'>
                  <span className='block mb-2 text-left'>
                    Quantity <span className='text-red-600'>*</span>
                  </span>
                  <Input
                    placeholder='Fill quantity'
                    {...register(`items.${index}.quantity`)}
                  />
                  {errors.items &&
                    errors.items[index] &&
                    errors.items[index].quantity && (
                      <span className='text-red-600 block mt-2'>
                        {errors.items[index].quantity.message}
                      </span>
                    )}
                </div>
              </div>
            ))}

            <Button
              type='button'
              onClick={() => {
                const newItems = [...items, { itemId: null, quantity: null }];
                setValue('items', newItems, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              className='mt-2 p-3'
            >
              + Add Item
            </Button>
          </div>

          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Return Before <span className='text-red-600'>*</span>
            </span>
            <ReactDatePicker
              onChange={(date) => {
                setValue('returnBefore', date, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              selected={returnBefore}
              dateFormat='dd MMM YYYY'
              className='w-full border border-neutral-300 rounded-lg p-2'
            />
            {errors.returnBefore && (
              <span className='text-red-600 block mt-2'>
                {errors.returnBefore.message}
              </span>
            )}
          </div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>Description</span>
            <Input
              placeholder='Fill description'
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

export default FormCreateBorrowItems;
