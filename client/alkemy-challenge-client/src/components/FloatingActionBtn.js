import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import withStyles from '@mui/styles/withStyles';

import styles from '../styles/FloatingActionBtnStyles'

function FloatingActionButton(props) {
  const { classes, onClick, title } = props;

  const [width, setWidth] = React.useState({
    width: window.innerWidth,
  });

  const handleResize = () => {
    setWidth({
      width: window.innerWidth,
    });
  }
  React.useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const isSmallScreen = () => {
    return width.width < 780;
  }

  if(isSmallScreen() || title == 'Dashboard'){
  return (
      <Box className={classes.fabBox} sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab className={classes.floatingBtn} aria-label="add" onClick={onClick}>
          <AddIcon />
        </Fab>
      </Box>
    )} else {
      return (
      <div></div>
    )
  }

}

export default withStyles(styles)(FloatingActionButton);