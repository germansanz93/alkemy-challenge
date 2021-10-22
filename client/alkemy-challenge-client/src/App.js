import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Appbar from './Appbar';
import Dashboard from './Dashboard';

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
      </Switch>
    )
  }

}

export default App;
