import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import styles from './styles/RecentsStyles';
import withStyles from '@mui/styles/withStyles';

function Recents(props) {
  const { classes, recents } = props;

  return (
    <div className={classes.listContainer}>
      <List className={classes.list} dense={true} sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          recents.map(mov => (
            <div className={classes.itemContainer}>
              <Divider />
              <ListItem className={classes.ListItem} alignItems="center">
                <div className={mov.mov_type_id == 1 ? classes.leftColorBarGreen : classes.leftColorBarRed}></div>
                <ListItemText
                  className={classes.listItemText}
                  primary={`$ ${mov.amount} - Category: ${mov.category}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {mov.mov_date.substring(0, 10)}
                      </Typography>
                      {` - ${mov.mov_description}`}
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