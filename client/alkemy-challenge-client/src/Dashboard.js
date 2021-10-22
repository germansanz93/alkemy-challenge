import React from 'react';
import withStyles from '@mui/styles/withStyles';
import SummaryBox from './SummaryBox';

import styles from './styles/DashboardStyles';

function Dashboard(props) {
  const { classes } = props;
  return (
    <div className={classes.mainContainer}>
      <h2>Dashboard</h2>
      <div className={classes.summariesContainer}>
        <SummaryBox title={'Total incomes:'} total={'$ 1234'} />
        <SummaryBox title={'Total expenses:'} total={'$ 1234'} />
        <SummaryBox title={'Month incomes:'} total={'$ 1234'} />
        <SummaryBox title={'Month expenses:'} total={'$ 1234'} />
      </div>
    </div>
  )
}

export default withStyles(styles)(Dashboard);