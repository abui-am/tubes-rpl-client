import { useForm } from 'react-hook-form';
import { createBorrower } from '../../services/borrower';
import toast from 'react-hot-toast';
import Button from '../common/button';
import ReactSelect from 'react-select';
import Input from '../common/input';

const FormCreateBorrower = ({ defaultValues, onSave }) => {
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues,
  });
  async function onSubmit(data) {
    try {
      await createBorrower({
        name: data.name,
        status: data?.status,
        registrationNumber: data?.registrationNumber,
      });
      onSave();

      reset();
      toast.success('Berhasil membuat borrower');
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
              Status<span className='text-red-600'>*</span>
            </span>
            <ReactSelect
              value={getValues('status')}
              options={[
                {
                  label: 'Student',
                  value: 'student',
                },
                {
                  label: 'Employee',
                  value: 'employee',
                },
              ]}
              onChange={(value) => {
                setValue('status', value.value);
              }}
            />
          </div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Registration Number<span className='text-red-600'>*</span>
            </span>
            <Input
              type='number'
              placeholder='Masukan registration number'
              {...register('registrationNumber')}
            />
          </div>

          <Button type='submit' className='w-full mt-3'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormCreateBorrower;
