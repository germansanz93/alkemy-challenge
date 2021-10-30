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
      recents: [],
      loading: true,
    }
    this.addMovement = this.addMovement.bind(this);
  }

  async componentDidMount() {
    //Load All movements from the API
    this.getDBAllMovements();
    //Load Recents movements from the API
    this.getDBRecents();
    //Load all categories from the API
    this.getDBAllCategories();
  }

  async getDBAllMovements() {
    try {
      let movements = [];
      let res = await axios.get('http://localhost:3030/movements');
      movements = res.data;
      this.setState({ movements, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  async getDBRecents() {
    try {
      let recents = [];
      let res = await axios.get('http://localhost:3030/movements/recent');
      recents = res.data;
      this.setState({ recents, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  async getDBAllCategories(){
    try {
      let categories = [];
      let res = await axios.get('http://localhost:3030/categories');
      categories = res.data;
      this.setState({ categories, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  async addMovement(movement) {
    try {
      let res = await axios.post('http://localhost:3030/movements', movement);
      alert(res.status)
      this.getDBAllMovements();
      this.getDBRecents();
    } catch (e) {
      console.log(e);
    }
  }

  getMovements() {
    return this.state.movements;
  }

  getRecents() {
    return this.state.recents;
  }

  getCategories() {
    return this.state.categories;
  }

  getBalance() {
    let movements = this.state.movements;
    let balance = movements.reduce((acc, curr) => {
      if (curr.mov_type_id == 1) {
        return acc + Number(curr.amount);
      }
      return acc - Number(curr.amount);
    }, 0);
    return balance;
  }

  getMovementsByType(type) {
    let movements = this.state.movements;
    let movementsByType = movements
      .filter(mov => mov.mov_type_id == type)
    return movementsByType;
  }

  // get month movements, if type is not passed, returns all month movements else returns the month movements by type
  getMonthMovements(month, type) {
    let movements = this.state.movements;
    let monthMovements;
    if (type) {
      monthMovements = movements.filter(mov => mov.mov_type_id == type)
    } else {
      monthMovements = movements;
    }
    monthMovements = monthMovements
      .filter(mov => new Date(mov.mov_date).getMonth() == month)
      .reduce((acc, curr) => {
        return acc + Number(curr.amount);
      }, 0);
    return monthMovements;
  }

  getMonthBalances(type) {
    const monthBalances = [];
    for (let month = 0; month <= 11; month++) {
      let monthBalance = type ? this.getMonthMovements(month, type) : this.getMonthMovements(month);
      monthBalances.push({ x: month + 1, y: monthBalance });
    }
    return monthBalances;
  }


  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            <Appbar
              balance={this.getBalance()}
              children={
                <Dashboard
                  recents={this.getRecents()}
                  balance={this.getBalance()}
                  categories={this.getCategories()}
                  movementsByType={(type) => this.getMovementsByType(type).reduce((acc, curr) => { return acc + Number(curr.amount) }, 0)}
                  monthMovements={(month, type) => this.getMonthMovements(month, type)}
                  monthBalances={(type) => this.getMonthBalances(type)}
                  addMovement={(movement) => this.addMovement(movement)}
                />
              }
            />
          }
        />
        <Route
          exact
          path="/movements"
          render={() =>
            <Appbar
              balance={this.getBalance()}
              children={
                <MovementsList
                  title='Movements'
                  fab={true}
                  movements={this.getMovements()}
                  addMovement={(movement) => this.addMovement(movement)}
                />
              }
            />
          }
        />
        <Route
          exact
          path="/incomes"
          render={() =>
            <Appbar
              balance={this.getBalance()}
              children={[
                <PieChart title='Incomes by category' />,
                <MovementsList
                  title='Incomes'
                  movements={this.getMovementsByType(1)}
                  addMovement={(movement) => this.addMovement(movement)}
                />
              ]}
            />
          }
        />
        <Route
          exact
          path="/expenses"
          render={() =>
            <Appbar
              balance={this.getBalance()}
              children={[
                <PieChart title='Expenses by category' />,
                <MovementsList
                  title='Expenses'
                  movements={this.getMovementsByType(2)}
                  addMovement={(movement) => this.addMovement(movement)}
                />
              ]}
            />
          }
        />
      </Switch>
    )
  }

}

export default App;
