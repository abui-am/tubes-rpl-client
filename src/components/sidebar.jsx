function Sidebar() {
  return (
    <aside className='p-6 w-[207px]'>
      <h2 className='text-base font-bold'>Dashboard</h2>
      <section className='mt-8'>
        <a className='flex items-center gap-2 '>
          <box-icon name='home' size='sm' color='#2563EB'></box-icon>
          <span className='text-sm font-bold text-[#2563EB]'>Home</span>
        </a>
      </section>
      <section className='mt-8'>
        <h3 className='text-xs text-neutral-600 mb-4'>Account</h3>
        <a className='flex items-center gap-2  mb-4'>
          <box-icon name='user-plus' size='sm'></box-icon>
          <span className='text-blueGray-400 text-sm'>Register Account</span>
        </a>
        <a className='flex items-center gap-2  mb-4'>
          <box-icon name='user' size='sm'></box-icon>
          <span className='text-blueGray-400 text-sm'>Manage Account</span>
        </a>
      </section>
    </aside>
  );
}

export default Sidebar;
