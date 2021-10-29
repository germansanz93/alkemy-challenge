import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import PieChart from './PieChart';
import './App.css';
import Appbar from './Appbar';
import Dashboard from './Dashboard';
import MovementsList from './MovementsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movements: [],
      loading: true,
    }
  }

  async componentDidMount() {
    //Load All movements from the API
    this.getAllMovements();
  }

  async getAllMovements() {
    try {
      let movements = [];
      let res = await axios.get('http://localhost:3030/movements');
      movements = res.data;
      this.setState({ movements, loading: false });
      console.log(this.state.movements);
    } catch (e){
      console.log(e);
    }
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
            <Appbar children={[<MovementsList title='Movements' fab={true} movements={this.state.movements}/>]} />
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
