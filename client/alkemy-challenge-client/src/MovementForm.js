import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import FloatingActionButton from './FlotatingActionBtn';
import withStyles from '@mui/styles/withStyles';
import styles from './styles/MovementFormStyles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function TransitionsModal(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  }

  return (
    <div>
      <FloatingActionButton onClick={handleOpen}></FloatingActionButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.root}>
            <form className={classes.modalForm}>
              <label className={classes.formInputLabel} for='date'><CalendarTodayIcon /><p>Date:</p> </label>
              <input className={classes.inputField} type='date' id='date' name='date'></input>
              <label className={classes.formInputLabel} for='description'><EventNoteIcon /><p>Description:</p> </label>
              <input className={classes.inputField} type='text' id='description' name='description'></input>
              <label className={classes.formInputLabel} for='category'><PieChartIcon /><p>Category:</p> </label>
              <input className={classes.inputField} type='text' id='category' name='category'></input>
              <div className={classes.typeRadioBtnsContainer}>
                <label className={classes.formInputLabel} for='type'><ShuffleIcon /><p>Type: </p></label>
                <div className={classes.typeRadioBtns}>
                  <div>
                    <label className={classes.formInputLabel} for='income'><KeyboardArrowUpIcon /> Income </label>
                    <input type='radio' id='income' name='type'></input>
                  </div>
                  <div>
                    <label className={classes.formInputLabel} for='expense'><KeyboardArrowDownIcon /> Expense </label>
                    <input type='radio' id='expense' name='type'></input>
                  </div>
                </div>
              </div>
              <label className={classes.formInputLabel} for='amount'><MonetizationOnIcon /><p>Amount:</p></label>
              <input className={classes.inputField} type='number' id='amount' name='amount'></input>
              <div className={classes.btnsContainer}>
                <button className={classes.backBtn} type='' onClick={handleClose}>Back</button>
                <button className={classes.submitBtn} type='submit'>Submit</button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default withStyles(styles)(TransitionsModal);