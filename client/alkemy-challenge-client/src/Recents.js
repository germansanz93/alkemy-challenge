import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import styles from './styles/RecentsStyles';
import withStyles from '@mui/styles/withStyles';

import movements from './movementsSeed';

function Recents(props) {
  const { classes } = props;

  return (
    <div className={classes.listContainer}>
      <List dense={true} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          movements.map(mov => (
            <div>
              <ListItem className={classes.ListItem} alignItems="flex-start">
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
              </ListItem>
              <Divider />
            </div>
          ))
        }
      </List>
    </div>
  );
}

export default withStyles(styles)(Recents)