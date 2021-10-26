import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

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
          render={(routeProps) =>
            <Appbar children={<Dashboard />} />
          }
        />
        <Route
          exact
          path="/movements"
          render={(routeProps) =>
            <Appbar children={<MovementsList />} />
          }
        />
      </Switch>
    )
  }

}

export default App;
