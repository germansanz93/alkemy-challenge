import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import withStyles from '@mui/styles/withStyles';


import styles from './styles/MovementFormStyles';
import MovementForm from './MovementForm';


function TransitionsModal(props) {
  const { classes, open, handleClose, addMovement, editMovement,categories, movement} = props;
  return (
    <div>
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
            <MovementForm handleClose={handleClose} addMovement={addMovement} editMovement={editMovement} categories={categories} movement={movement}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default withStyles(styles)(TransitionsModal);