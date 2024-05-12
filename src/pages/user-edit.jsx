import CommonLayout from '../components/layouts/common';
import FormCreateAccount from '../components/forms/form-create-account';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getUserById } from '../services/login';

function UserEditPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  const fetchAccount = useCallback(
    async function () {
      try {
        setIsLoading(true);
        const res = await getUserById(id);
        const resData = res.data;
        setIsLoading(false);
        setDefaultValues({
          name: resData.name,
          email: resData.email,
          role: resData.roleId,
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
          <FormCreateAccount editId={id} defaultValues={defaultValues} />
        )}
      </div>
    </CommonLayout>
  );
}

export default UserEditPage;
