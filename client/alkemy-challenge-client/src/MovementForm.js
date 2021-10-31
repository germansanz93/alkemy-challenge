import React, { Component } from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import withStyles from '@mui/styles/withStyles';
import styles from './styles/MovementFormStyles';

class MovementForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().substring(0, 10),
      description: '',
      category: '',
      type: '',
      amount: ''
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addMovement(this.state);
    this.props.handleClose();
  }

  render() {
    const { classes, handleClose, categories } = this.props;
    return (
      <div class='formContainer'>
        <form className={classes.modalForm} onSubmit={this.handleSubmit}>
          <label className={classes.formInputLabel} htmlFor='date'><CalendarTodayIcon /><p>Date:</p> </label>
          <input
            className={classes.inputField}
            type='date'
            id='date'
            name='date'
            onChange={this.handleChange}
            min="2000-01-01"
            value={this.state.date}
            required
          />
          <label className={classes.formInputLabel} htmlFor='description'><EventNoteIcon /><p>Description:</p> </label>
          <input
            className={classes.inputField}
            type='text'
            id='description'
            name='description'
            onChange={this.handleChange}
            required
          />
          <label className={classes.formInputLabel} htmlFor='category'><PieChartIcon /><p>Category:</p> </label>
          <select className={classes.inputField} name='category' onChange={this.handleChange}>
            {categories.map(category => {
              return <option key={category.id} value={category.id}>{category.category}</option>
            })}
          </select>
          <div className={classes.typeRadioBtnsContainer}>
            <label className={classes.formInputLabel} htmlFor='type'><ShuffleIcon /><p>Type: </p></label>
            <div className={classes.typeRadioBtns}>
              <div>
                <label className={classes.formInputLabel} htmlFor='income'><KeyboardArrowUpIcon /> Income </label>
                <input
                  type='radio'
                  id='income'
                  name='type'
                  value='1'
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div>
                <label className={classes.formInputLabel} htmlFor='expense'><KeyboardArrowDownIcon /> Expense </label>
                <input
                  type='radio'
                  id='expense'
                  name='type'
                  value='2'
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <label className={classes.formInputLabel} htmlFor='amount'><MonetizationOnIcon /><p>Amount:</p></label>
          <input
            className={classes.inputField}
            type='number'
            id='amount'
            name='amount'
            onChange={this.handleChange}
            min='0'
            step='0.1'
            required
          />
          <div className={classes.btnsContainer}>
            <a className={classes.backBtn} onClick={handleClose}>Back</a>
            <button className={classes.submitBtn} type='submit'>Submit</button>
          </div>
        </form>
      </div>
    )
  }

}

export default withStyles(styles)(MovementForm)