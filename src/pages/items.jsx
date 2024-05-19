import CommonLayout from '../components/layouts/common';
import TableItems from '../components/tables/table-items';

function ItemsPage() {
  return (
    <CommonLayout>
      <div className='pb-8'>
        <h1 className='text-2xl font-bold'>Item List</h1>
      </div>
      <div className='max-w-6xl mx-auto'>
        <TableItems />
      </div>
    </CommonLayout>
  );
}

export default ItemsPage;
