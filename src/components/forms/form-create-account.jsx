import { useForm } from 'react-hook-form';
import Input from '../common/input';
import { registerUser, updateUser } from '../../services/login';
import toast from 'react-hot-toast';
import Button from '../common/button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function FormCreateAccount({ defaultValues, editId }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const navigate = useNavigate();
  const isEditMode = !!editId;
  async function onSubmit(data) {
    try {
      if (isEditMode) {
        await updateUser(editId, {
          email: data.email,
          password: data.password,
          roleId: +data.role,
          name: data.name,
        });
      } else {
        await registerUser({
          email: data.email,
          password: data.password,
          roleId: +data.role,
          name: data.name,
        });
      }

      reset();
      navigate('/account');
      toast.success('Berhasil membuat akun');
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
            <Input placeholder='Masukan nama' {...register('name')} />
            <span className='block mb-2 text-left'>
              Email<span className='text-red-600'>*</span>
            </span>
          </div>
          <div className='mb-3'>
            <Input placeholder='Masukan email' {...register('email')} />
            <span className='block mb-2 text-left'>
              Password<span className='text-red-600'>*</span>
            </span>
            <Input
              placeholder='Masukan password'
              type='password'
              {...register('password')}
            />
          </div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Role<span className='text-red-600'>*</span>
            </span>
            <select {...register('role')}>
              <option value={1}>Super Admin</option>
              <option value={2}>Admin</option>
            </select>
          </div>

          <Button type='submit' className='w-full mt-3'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

FormCreateAccount.propTypes = {
  defaultValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.number.isRequired,
  }),
  editId: PropTypes.string,
};

export default FormCreateAccount;
