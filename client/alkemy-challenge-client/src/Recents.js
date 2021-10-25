import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import styles from './styles/RecentsStyles';
import withStyles from '@mui/styles/withStyles';

function Recents(props) {
  const { classes } = props;
  const movements = [
    {
      date: '2021/10/10',
      amount: 1200,
      description: 'Salary',
      category: 'Salary',
      type: 1
    },
    {
      date: '2021/10/25',
      amount: 100.00,
      description: 'Payment for rent',
      category: 'Rent',
      type: 2
    },
    {
      date: '2021/10/26',
      amount: 200.00,
      description: 'Month Food',
      category: 'Food',
      type: 2
    },
    {
      date: '2021/10/10',
      amount: 1200,
      description: 'Salary',
      category: 'Salary',
      type: 1
    },
    {
      date: '2021/10/25',
      amount: 100.00,
      description: 'Payment for rent',
      category: 'Rent',
      type: 2
    },
    {
      date: '2021/10/26',
      amount: 200.00,
      description: 'Month Food',
      category: 'Food',
      type: 2
    },
    {
      date: '2021/10/10',
      amount: 1200,
      description: 'Salary',
      category: 'Salary',
      type: 1
    },
    {
      date: '2021/10/25',
      amount: 100.00,
      description: 'Payment for rent',
      category: 'Rent',
      type: 2
    },
    {
      date: '2021/10/26',
      amount: 200.00,
      description: 'Month Food',
      category: 'Food',
      type: 2
    },
    {
      date: '2021/10/10',
      amount: 1200,
      description: 'Salary',
      category: 'Salary',
      type: 1
    },

  ]
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