import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TableCustomers from '../components/Tables/TableCustomer';
import Loader from '../common/Loader';

const Tables = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/customers')
      .then((Response) => {
        console.log(Response);
        setCustomers(Response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Breadcrumb pageName="Data Jama'ah" />

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo /> */}
        {/* <TableThree /> */}
        <TableCustomers customers={customers} />
      </div>
      {console.log(customers)}
    </>
  );
};

export default Tables;
