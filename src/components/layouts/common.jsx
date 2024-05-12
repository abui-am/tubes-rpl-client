import Cookies from 'js-cookie';
import Sidebar from '../sidebar';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
function CommonLayout({ children }) {
  const navigate = useNavigate();
  function handleLogout() {
    Cookies.remove('Authorization');
    navigate('/login');
  }
  return (
    <section className='flex h-min-screen w-full min-w-0'>
      <div role='navigation flex-1 '>
        <Sidebar />
      </div>
      <div className='bg-[#F9FAFC] flex-1 h-full'>
        <div className='py-4 px-8 bg-white justify-between flex border-b border-b-neutral-200 sticky top-0 z-10'>
          <div></div>
          <button className='text-sm font-bold' onClick={handleLogout}>
            Logout
          </button>
        </div>
        <main className='p-10'>{children}</main>
      </div>
    </section>
  );
}

CommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonLayout;
