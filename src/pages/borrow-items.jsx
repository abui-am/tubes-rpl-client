import CommonLayout from '../components/layouts/common';
import TableBorrowItems from '../components/tables/table-borrow-items';

function BorrowItemsPage() {
  return (
    <CommonLayout>
      <div className='pb-8'>
        <h1 className='text-2xl font-bold'>Item List</h1>
      </div>
      <div className='max-w-6xl mx-auto'>
        <TableBorrowItems />
      </div>
    </CommonLayout>
  );
}

export default BorrowItemsPage;
