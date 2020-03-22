import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Customers from './Components/Customers';
import Calendar from './Components/Calendar';
import Trainings from './Components/Trainings';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Personal trainer schedule
            </Typography>
          </Toolbar>
        </AppBar>
        <BrowserRouter>
        <div>
          <Link to="/calendar">Calendar</Link> {''}
          <Link to="/trainings">Trainings</Link> {''}
          <Link to="/customers">Customers</Link> {''}
          
          <Switch>
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/trainings" component={Trainings} />
            <Route exact path="/customers" component={Customers} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>      
      </BrowserRouter>


    </div>
  );
}

export default App;
