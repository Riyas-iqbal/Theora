import DefaultLayout from '../../components/admin/DefaultLayout'
// import TableOne from '../../components/admin/TableOne'
// import TableTwo from '../../components/admin/Table'
import TutorsList from '../../components/admin/TutorListTable';
import Breadcrumb from '../../components/admin/Breadcrumb';

const ManageTutors = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Tutors" />

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo /> */}
        <TutorsList />
      </div>
    </DefaultLayout>
  );
};

export default ManageTutors;