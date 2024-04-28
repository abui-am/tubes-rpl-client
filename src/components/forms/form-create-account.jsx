import { useForm } from 'react-hook-form';
import Input from '../common/input';
import { registerUser } from '../../services/login';
import toast from 'react-hot-toast';
import Button from '../common/button';

function FormCreateAccount() {
  const { register, handleSubmit, reset } = useForm({});
  async function onSubmit(data) {
    console.log(data);
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        roleId: +data.role,
        name: data.name,
      });
      reset();
      toast.success('Berhasil membuat akun');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span className='block mb-2 text-left'>
            Name<span className='text-red-600'>*</span>
          </span>
          <Input placeholder='Masukan nama' {...register('name')} />
          <span className='block mb-2 text-left'>
            Email<span className='text-red-600'>*</span>
          </span>
          <Input placeholder='Masukan email' {...register('email')} />
          <span className='block mb-2 text-left'>
            Password<span className='text-red-600'>*</span>
          </span>
          <Input
            placeholder='Masukan password'
            type='password'
            {...register('password')}
          />
          <span className='block mb-2 text-left'>
            Role<span className='text-red-600'>*</span>
          </span>
          <select {...register('role')}>
            <option value={1}>Admin</option>
            <option value={2}>User</option>
          </select>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default FormCreateAccount;
