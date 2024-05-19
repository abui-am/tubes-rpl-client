import FormCreateItem from '../components/forms/form-create-items';
import CommonLayout from '../components/layouts/common';
const ItemCreatePage = () => {
  return (
    <CommonLayout>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg '>
        <div className='p-6 !pb-0'>
          <h1 className='text-2xl font-bold'>Create New Item</h1>
        </div>
        <FormCreateItem />
      </div>
    </CommonLayout>
  );
};

export default ItemCreatePage;
