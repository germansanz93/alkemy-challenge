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
      amount: 0
    }
  }

  componentDidMount() {
    const { movement } = this.props;
    if (movement) {
      this.setState({
        id: movement.id,
        date: movement.mov_date.substring(0, 10),
        description: movement.mov_description,
        category: movement.category,
        type: movement.mov_type_id,
        amount: movement.amount
      })
    } else {
      this.setState({
        date: new Date().toISOString().substring(0, 10),
        description: '',
        category: 1,
        type: '1',
        amount: 0
      })
    }
  }

  componentDidUpdate() {
    if(!this.state.type) this.renderUpdate();
  }

  renderUpdate() {

    if(this.props.title == 'New Income'){
      this.setState({
        type: '1'
      })
    }else {
      this.setState({
        type: '2'
      })
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleCreate = () => {
    const { addMovement, movement } = this.props;
    const { date, description, category, type, amount } = this.state;
    addMovement({ date, description, category, type, amount });
  }

  handleUpdate = () => {
    const { editMovement, handleClose } = this.props;
    const { id, date, description, category, type, amount } = this.state;
    editMovement({ id, date, description, category, type, amount });
    handleClose();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.id ? this.handleUpdate() : this.handleCreate();
    this.setState({
      date: new Date().toISOString().substring(0, 10),
      description: '',
      category: '1',
      type: '',
      amount: 0
    })
  }

  render() {
    const { classes, handleClose, categories, movement, title } = this.props;
    return (
      <div class='formContainer'>
        <h3 className={classes.cardTitle}>{title}</h3>
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
            value={this.state.description}
            required
          />
          <label className={classes.formInputLabel} htmlFor='category'><PieChartIcon /><p>Category:</p> </label>
          <select
            className={classes.inputField}
            name='category'
            onChange={this.handleChange}
          >
            {categories.map(category => {
              return <option
                key={category.id}
                value={category.id}
                selected={category.category == this.state.category}
              >
                {category.category}
              </option>
            })}
          </select>
          <div className={classes.typeRadioBtnsContainer}>
            <label className={classes.formInputLabel} htmlFor='type'><ShuffleIcon /><p>Type: </p></label>
            <div className={`${classes.typeRadioBtns} ${movement && classes.disabled} ${title == 'New Income' && classes.disabled}`}>
              <div>
                <label className={classes.formInputLabel} htmlFor='income'><KeyboardArrowUpIcon /> Income </label>
                <input
                  className={classes.inputField}
                  type='radio'
                  id='income'
                  name='type'
                  checked={this.state.type == '1' || title == 'New Income' || title == 'New Expense'}
                  value='1'
                  onChange={this.handleChange}
                  required
                  disabled={movement}
                />
              </div>
              <div>
                <label className={classes.formInputLabel} htmlFor='expense'><KeyboardArrowDownIcon /> Expense </label>
                <input
                  className={classes.inputField}
                  type='radio'
                  id='expense'
                  name='type'
                  checked={this.state.type == '2' || title == 'New Expense'}
                  value='2'
                  onChange={this.handleChange}
                  required
                  disabled={movement}
                />
              </div>
            </div>
          </div>
          <label className={classes.formInputLabel} htmlFor='amount'><MonetizationOnIcon /><p>Amount:</p></label>
          <input
            onChange={this.handleChange}
            value={parseInt(this.state.amount)}
            name='amount'
            id='amount'
            className={classes.inputField}
            step='0.01'
            min='0'
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