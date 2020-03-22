import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import 'react-table/react-table.css';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';


export default function Customerlist() {

  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => fetchData(), []);

  
  const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
  } 
  setOpen(false);
 };

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
    fetch(link, {method: 'DELETE'})
    .then(res => fetchData())
    .catch(err => console.error(err))
    setOpen(true);
    }
}

const addTraining = (training) => {
  fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
}

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

const updateCustomer = (customer, link) => {
  fetch(link, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
  body: JSON.stringify(customer)
  })
  .then(res => fetchData())
  .catch(err => console.error(err))
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
    },
    {
        sortable: false,
        filterable: false,
        width: 100,
        Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original}/>
    },
    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links[0].href',
        Cell: row => <Button size="small" color="secondary" onClick={() => deleteCustomer(row.value)}>Delete</Button>
    },
    {
        Header: "",
        filterable: false,
        sortable: false,
        width: 175,
        accessor: "links[0].href",
        Cell: row => <Addtraining addTraining={addTraining} customer={row.original} />
  },
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
        <Addcustomer saveCustomer={saveCustomer}/>
        <ReactTable filterable={true} defaultFilterMethod={filterCaseInsensitive} data={customers} columns={columns} 
        defaultSorted={[
          {
              id: "lastname",
              asc: true
          },
          {
            id: "firstname",
            asc: true
        }
        ]}
        />
        <Snackbar
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
          }}
          open={open}
          autoHideDuration={3100}
          onClose={handleClose}
          message="Customer was deleted"

        />
    </div>
);


}