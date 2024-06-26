import { useState } from 'react';
import Button from '../common/button';
import Input from '../common/input';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/login';
function FormLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function handleClick() {
    try {
      const res = await login(email, password);
      Cookies.set('Authorization', res.data.token);
      Cookies.set('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Email atau password salah');
      return;
    }
  }
  return (
    <div className='max-w-[640px] text-left shadow-lg p-6 rounded bg-white w-full'>
      <h2 className='text-lg font-bold mb-6'>Login</h2>
      <section className='flex flex-col gap-6'>
        <div>
          <span className='block mb-2 text-left'>
            Email<span className='text-red-600'>*</span>
          </span>
          <Input
            placeholder='Masukan email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <span className='block mb-2 text-left'>
            Password<span className='text-red-600'>*</span>
          </span>
          <Input
            placeholder='Masukan password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='w-full'>
          <Button onClick={handleClick} className='!w-full'>
            Login
          </Button>
        </div>
      </section>
    </div>
  );
}

export default FormLogin;
