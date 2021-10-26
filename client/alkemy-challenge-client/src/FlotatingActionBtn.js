import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import withStyles from '@mui/styles/withStyles';

import styles from './styles/FlotatingActionBtnStyles'

function FloatingActionButton(props) {
  const { classes, onClick } = props;
  return (
    <Box className={classes.fabBox} sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab className={classes.floatingBtn} aria-label="add" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default withStyles(styles)(FloatingActionButton);