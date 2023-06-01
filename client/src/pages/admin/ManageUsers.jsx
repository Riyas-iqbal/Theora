import DefaultLayout from '../../components/admin/DefaultLayout'
// import TableOne from '../../components/admin/TableOne'
// import TableTwo from '../../components/admin/Table'
import TableThree from '../../components/admin/TableThree'
import Breadcrumb from '../../components/admin/Breadcrumb';

const ManageUsers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Users" />

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo /> */}
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default ManageUsers;