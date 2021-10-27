import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import withStyles from '@mui/styles/withStyles';
import { AutoSizer } from 'react-virtualized'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import FloatingActionButton from './FlotatingActionBtn';

import styles from './styles/MovementsListStyles';
import 'react-virtualized/styles.css';


import movements from './movementsSeed';
import MovementForm from './MovementForm';

function MovementsList(props) {
  const { classes, title, fab } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  }

  return (
    <div className={classes.container}>
      <h3>{title}</h3>
      <Box
        className={classes.movementsListContainer}
        sx={{ bgcolor: 'background.paper' }}
      >
        <AutoSizer className={classes.AutoSizer}>
          {({ width, height }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={46}
              itemCount={movements.length}
              overscanCount={10}
            >
              {() => movements.map(mov => (
                <div>
                  <ListItem className={classes.ListItem} alignItems="center">
                    <div className={mov.type == 1 ? classes.leftColorBarGreen : classes.leftColorBarRed}></div>
                    <ListItemText
                      primary={`$ ${mov.amount} - Category: ${mov.category}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {mov.date}
                          </Typography>
                          {` - ${mov.description}`}
                        </React.Fragment>
                      }
                    />
                    <IconButton aria-label="edit" onClick={handleOpen}>
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
      <MovementForm open={open} handleClose={handleClose}/>
      {fab && <FloatingActionButton onClick={handleOpen}></FloatingActionButton>}
    </div>
  );
}

export default withStyles(styles)(MovementsList);