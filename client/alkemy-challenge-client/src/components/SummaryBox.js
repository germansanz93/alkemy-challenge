import React from 'react';
import withStyles from '@mui/styles/withStyles';
import styles from '../styles/SummaryBoxStyles';

function SummaryBox(props) {
  const {classes, type} = props;
  return (
    <div className={classes.container}>
      <p className={classes.title}>{props.title}</p>
      <h3 className={`${classes.total} ${type == 1 ? classes.income : classes.expense}`}>{props.total}</h3>
    </div>
  )
}


export default withStyles(styles)(SummaryBox);