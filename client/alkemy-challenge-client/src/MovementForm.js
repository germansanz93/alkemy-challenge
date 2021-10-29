import React from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import withStyles from '@mui/styles/withStyles';
import styles from './styles/ModalFormStyles';

function MovementForm(props) {
  const {classes, handleClose} = props;
  return (
    <div>
      <form className={classes.modalForm}>
        <label className={classes.formInputLabel} htmlFor='date'><CalendarTodayIcon /><p>Date:</p> </label>
        <input className={classes.inputField} type='date' id='date' name='date'></input>
        <label className={classes.formInputLabel} htmlFor='description'><EventNoteIcon /><p>Description:</p> </label>
        <input className={classes.inputField} type='text' id='description' name='description'></input>
        <label className={classes.formInputLabel} htmlFor='category'><PieChartIcon /><p>Category:</p> </label>
        <input className={classes.inputField} type='text' id='category' name='category'></input>
        <div className={classes.typeRadioBtnsContainer}>
          <label className={classes.formInputLabel} htmlFor='type'><ShuffleIcon /><p>Type: </p></label>
          <div className={classes.typeRadioBtns}>
            <div>
              <label className={classes.formInputLabel} htmlFor='income'><KeyboardArrowUpIcon /> Income </label>
              <input type='radio' id='income' name='type'></input>
            </div>
            <div>
              <label className={classes.formInputLabel} htmlFor='expense'><KeyboardArrowDownIcon /> Expense </label>
              <input type='radio' id='expense' name='type'></input>
            </div>
          </div>
        </div>
        <label className={classes.formInputLabel} htmlFor='amount'><MonetizationOnIcon /><p>Amount:</p></label>
        <input className={classes.inputField} type='number' id='amount' name='amount'></input>
        <div className={classes.btnsContainer}>
          <button className={classes.backBtn} type='' onClick={handleClose}>Back</button>
          <button className={classes.submitBtn} type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}


export default withStyles(styles)(MovementForm)