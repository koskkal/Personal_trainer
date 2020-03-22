import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'moment-timezone';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';


export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
      } 
      setOpen(false);
    };

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + link, {method: "DELETE"})
        .then(res => fetchData())
        .catch(err => console.error(err))
        setOpen(true);
        }
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
        accessor: 'date',
        Cell: props => (<span>{moment.utc(props.value).format('DD.MM.YYYY HH:mm')}</span>)
    },
    {
        Header: 'Activity',
        accessor: 'activity'
    },
    {
        Header: 'Duration',
        accessor: 'duration'
    },
    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'id',
        Cell: row => <Button size="small" color="secondary" onClick={() => deleteTraining(row.value)}>Delete</Button>
    }
]
  
  function filterCaseInsensitive(filter, row) {
	  const id = filter.pivotId || filter.id;
	  return (
		  row[id] !== undefined ?
			  String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()):true
	);
}

return (
    <div>
        <ReactTable 
            filterable={true} 
            defaultFilterMethod={filterCaseInsensitive} 
            data={trainings} 
            columns={columns} 
            defaultSorted={[
            {
                id: "customer.id",
                asc: true
            },
            {
                id: "date",
                asc: true
            }
            ]}/>
        <Snackbar
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
          }}
          open={open}
          autoHideDuration={3100}
          onClose={handleClose}
          message="Training was deleted"
        />
    </div>
);


}