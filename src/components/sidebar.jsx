import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className='p-6 w-[207px]'>
      <h2 className='text-base font-bold'>Dashboard</h2>
      <section className='mt-8'>
        <Link className='flex items-center gap-2' to='/'>
          <box-icon name='home' size='sm' color='#2563EB'></box-icon>
          <span className='text-sm font-bold text-[#2563EB]'>Home</span>
        </Link>
      </section>
      <section className='mt-8'>
        <h3 className='text-xs text-neutral-600 mb-4'>Account</h3>
        <Link className='flex items-center gap-2  mb-4' to='/account/create'>
          <box-icon name='user-plus' size='sm'></box-icon>
          <span className='text-blueGray-400 text-sm'>Register Account</span>
        </Link>
        <Link className='flex items-center gap-2  mb-4' to='/account'>
          <box-icon name='user' size='sm'></box-icon>
          <span className='text-blueGray-400 text-sm'>Manage Account</span>
        </Link>
      </section>
    </aside>
  );
}

export default Sidebar;
