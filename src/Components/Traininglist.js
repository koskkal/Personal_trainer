import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';


export default function Traininglist() {

  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  
  const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
  }

  const columns = [
    {
        Header: 'Customer ID',
        accessor: 'customer.id'
    },
    {
        Header: 'First name',
        accessor: 'customer.firstname'
    },
    {
        Header: 'Last name',
        accessor: 'customer.lastname'
    },
    {
        Header: 'Date',
        accessor: 'date'
    },
    {
        Header: 'Activity',
        accessor: 'activity'
    },
    {
        Header: 'Duration',
        accessor: 'duration'
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
        <ReactTable filterable={true} defaultFilterMethod={filterCaseInsensitive} data={trainings} columns={columns}/>

    </div>
);


}