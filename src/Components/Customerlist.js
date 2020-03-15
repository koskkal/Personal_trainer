import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


export default function Customerlist() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  
  const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
  }

  const columns = [
    {
        Header: 'First name',
        accessor: 'firstname'
    },
    {
        Header: 'Last name',
        accessor: 'lastname'
    },
    {
        Header: 'Street address',
        accessor: 'streetaddress'
    },
    {
        Header: 'Postal code',
        accessor: 'postcode'
    },
    {
        Header: 'City',
        accessor: 'city'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    }
]
  

 function filterCaseInsensitive(filter, row) {
	  const id = filter.pivotId || filter.id;
	  return (
		  row[id] !== undefined ?
			  String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()):true
	);
}
  return(
    <div>
        <ReactTable filterable={true} defaultFilterMethod={filterCaseInsensitive} data={customers} columns={columns}/>

    </div>
);


}