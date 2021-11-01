import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Appbar from './components/Appbar';
import Dashboard from './components/Dashboard';
import MovementsList from './components/MovementsList';
import MovementForm from './components/MovementForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movements: [],
      recents: [],
      loading: true,
      categories: [],
    }
    this.addMovement = this.addMovement.bind(this);
  }

  async componentDidMount() {
    //Load All movements from the API
    const movements = await this.getDBAllMovements();
    //Load Recents movements from the API
    const recents = await this.getDBRecents();
    //Load all categories from the API
    const categories = await this.getDBAllCategories();

    this.setState({
      movements: movements,
      recents: recents,
      categories: categories,
      loading: false
    });
  }

  async getDBAllMovements() {
    try {
      let movements = [];
      let res = await axios.get('http://localhost:3030/movements');
      movements = res.data;
      return movements;
    } catch (e) {
      console.log(e);
    }
  }

  async getDBRecents() {
    try {
      let recents = [];
      let res = await axios.get('http://localhost:3030/movements/recent');
      recents = res.data;
      return recents
    } catch (e) {
      console.log(e);
    }
  }

  async getDBAllCategories() {
    try {
      let categories = [];
      let res = await axios.get('http://localhost:3030/categories');
      categories = res.data;
      return categories;
    } catch (e) {
      console.log(e);
    }
  }

  async getDBCategoryByName(name) {
    try {
      let category = [];
      let res = await axios.get('http://localhost:3030/categories/' + name);
      category = res.data;
      return category;
    } catch (e) {
      console.log(e);
    }
  }

  async updateDBMovement(movement) {
    movement.category = await this.getDBCategoryByName(movement.category);
    try {
      let res = await axios.put('http://localhost:3030/movements/' + movement.id, movement);
      alert(res.status)
      const movements = await this.getDBAllMovements();
      const recents = await this.getDBRecents();
      this.setState({
        movements: movements,
        recents: recents,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteDBMovement(id) {
    try {
      let res = await axios.delete('http://localhost:3030/movements/' + id);
      alert(res.status)
      const movements = await this.getDBAllMovements();
      const recents = await this.getDBRecents();
      this.setState({
        movements: movements,
        recents: recents,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  async addDBMovement(movement) {
    try {
      let res = await axios.post('http://localhost:3030/movements', movement);
      alert(res.status)
      const movements = await this.getDBAllMovements();
      const recents = await this.getDBRecents();
      this.setState({
        movements: movements,
        recents: recents,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  addMovement(movement) {
    this.addDBMovement(movement);
  }

  editMovement(movement) {
    this.updateDBMovement(movement);
  }

  deleteMovement(id) {
    this.deleteDBMovement(id);
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
      <div className="App">
        <Appbar balance={this.getBalance()}/>
        <Switch>
          <Route exact path="/" component={() =>
            <Dashboard
              title={'Dashboard'}
              recents={this.getRecents()}
              balance={this.getBalance()}
              categories={this.getCategories()}
              movementsByType={(type) => this.getMovementsByType(type).reduce((acc, curr) => { return acc + Number(curr.amount) }, 0)}
              monthMovements={(month, type) => this.getMonthMovements(month, type)}
              monthBalances={(type) => this.getMonthBalances(type)}
              addMovement={(movement) => this.addMovement(movement)}
              updateMovement={(movement) => this.editMovement(movement)}
            />
          }
          />
          <Route
            exact
            path="/movements"
            render={() =>
              <Appbar
                title="Movements"
                balance={this.getBalance()}
                children={[
                  <MovementForm
                    categories={this.getCategories()}
                    title={'New Movement'}
                    addMovement={(movement) => this.addMovement(movement)}
                    editMovement={(movement) => this.editMovement(movement)}
                    deleteMovement={(id) => this.deleteMovement(id)}
                    categories={this.getCategories()}
                  />,
                  <MovementsList
                    title='Movements'
                    fab={true}
                    movements={this.getMovements()}
                    addMovement={(movement) => this.addMovement(movement)}
                    editMovement={(movement) => this.editMovement(movement)}
                    deleteMovement={(id) => this.deleteMovement(id)}
                    categories={this.getCategories()}
                  />
                ]
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
                  <MovementForm
                    categories={this.getCategories()}
                    title='New Income'
                    addMovement={(movement) => this.addMovement(movement)}
                    editMovement={(movement) => this.editMovement(movement)}
                    deleteMovement={(id) => this.deleteMovement(id)}
                    categories={this.getCategories()}
                    movement={
                      {
                        mov_type_id: 1,
                        mov_date: new Date().toISOString(),
                        amount: 0,
                        description: '',
                        category: 1
                      }
                    }
                  />,
                  <MovementsList
                    categories={this.getCategories()}
                    title='Incomes'
                    fab={true}
                    movements={this.getMovementsByType(1)}
                    addMovement={(movement) => this.addMovement(movement)}
                    editMovement={(movement) => this.editMovement(movement)}
                    deleteMovement={(id) => this.deleteMovement(id)}
                    categories={this.getCategories()}
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
                  <MovementForm
                    movement={
                      {
                        mov_type_id: 1,
                        mov_date: new Date().toISOString(),
                        amount: 0,
                        description: '',
                        category: 1
                      }
                    }
                    categories={this.getCategories()}
                    title='New Expense'
                    addMovement={(movement) => this.addMovement(movement)}
                    editMovement={(movement) => this.editMovement(movement)}
                    deleteMovement={(id) => this.deleteMovement(id)}
                    categories={this.getCategories()}
                  />,
                  <MovementsList
                    title='Expenses'
                    movements={this.getMovementsByType(2)}
                    addMovement={(movement) => this.addMovement(movement)}
                    addMovement={(movement) => this.addMovement(movement)}
                    editMovement={(movement) => this.editMovement(movement)}
                    deleteMovement={(id) => this.deleteMovement(id)}
                    categories={this.getCategories()}
                  />,
                ]}
              />
            }
          />
        </Switch>
      </div>
    )
  }

}

export default App;
