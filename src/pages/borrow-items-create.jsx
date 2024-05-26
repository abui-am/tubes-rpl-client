import FormCreateBorrowItems from '../components/forms/form-create-borrow-items';

import CommonLayout from '../components/layouts/common';
const BorrowItemCreatePage = () => {
  return (
    <CommonLayout>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg '>
        <div className='p-6 !pb-0'>
          <h1 className='text-2xl font-bold'>Borrow Inventory</h1>
        </div>
        <FormCreateBorrowItems />
      </div>
    </CommonLayout>
  );
};

export default BorrowItemCreatePage;
