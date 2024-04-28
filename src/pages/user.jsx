import CommonLayout from '../components/layouts/common';
import TableAccount from '../components/tables/table-account';

function UserPage() {
  return (
    <CommonLayout>
      Account
      <TableAccount />
    </CommonLayout>
  );
}

export default UserPage;
