import React from 'react';
import {useState, useEffect} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';

const localizer = momentLocalizer(moment);

const TrainingCalendar = () => {
const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []
  );


  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => {
        return setTrainings(
            data.map(training => ({
            start: new Date(training.date),
            end: new Date(moment(training.date).add(training.duration, "minutes")),
            title: training.activity
          }))
        );
      });
  };
 

  return (
    <div>
      <Calendar
      eventPropGetter={
        () => {
          let newStyle = {
            backgroundColor: "lightyellow",
            color: 'black',
            borderRadius: "1px",
            borderColor: 'black'
          };
    
          return {
            className: "",
            style: newStyle
          };
        }
      }
        views={['month', 'week', 'day']}
        defaultView = "week"
        localizer = {localizer}
        events = {trainings}
        style = {{height: 750}}
        startAccessor = "start"
        endAccessor = "end"
      />
    </div>
  );
};

export default TrainingCalendar;