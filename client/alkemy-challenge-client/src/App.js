import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import PieChart from './PieChart';
import './App.css';
import Appbar from './Appbar';
import Dashboard from './Dashboard';
import MovementsList from './MovementsList';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            <Appbar children={<Dashboard />} />
          }
        />
        <Route
          exact
          path="/movements"
          render={() =>
            <Appbar children={[<MovementsList title='Movements' fab={true}/>]} />
          }
        />
        <Route
          exact
          path="/incomes"
          render={() =>
            <Appbar children={[<PieChart title='Incomes by category'/>, <MovementsList title='Incomes'/>]} />
          }
        />
        <Route
          exact
          path="/expenses"
          render={() =>
            <Appbar children={[<PieChart title='Expenses by category'/>, <MovementsList title='Expenses'/>]} />
          }
        />
      </Switch>
    )
  }

}

export default App;
