import CommonLayout from '../components/layouts/common';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getItemById } from '../services/item';
import FormCreateItem from '../components/forms/form-create-items';

function ItemEditPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  const fetchAccount = useCallback(
    async function () {
      try {
        setIsLoading(true);
        const res = await getItemById(id);
        const resData = res.data;
        setIsLoading(false);
        setDefaultValues({
          name: resData.name,
          quantity: resData.quantity,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);
  return (
    <CommonLayout>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg '>
        <div className='p-6 !pb-0'>
          <h1 className='text-2xl font-bold'>Edit Account</h1>
        </div>
        {isLoading ? (
          <p className='p-6'> Loading...</p>
        ) : (
          <FormCreateItem editId={id} defaultValues={defaultValues} />
        )}
      </div>
    </CommonLayout>
  );
}

export default ItemEditPage;
