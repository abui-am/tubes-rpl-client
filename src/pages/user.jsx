import CommonLayout from '../components/layouts/common';
import TableAccount from '../components/tables/table-account';

function UserPage() {
  return (
    <CommonLayout>
      <div className='pb-8'>
        <h1 className='text-2xl font-bold'>Create Account</h1>
      </div>
      <div className='max-w-6xl mx-auto'>
        <TableAccount />
      </div>
    </CommonLayout>
  );
}

export default UserPage;
