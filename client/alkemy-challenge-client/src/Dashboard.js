import React from 'react';
import withStyles from '@mui/styles/withStyles';
import SummaryBox from './SummaryBox';
import '../node_modules/react-vis/dist/style.css';

import Plot from './Plot';
import Recents from './Recents'
import styles from './styles/DashboardStyles';

function Dashboard(props) {
  const { classes } = props;

  return (
    <div className={classes.mainContainer}>
      <h2>Dashboard</h2>
      <div className={`${classes.summariesContainer} ${classes.card}`}>
        <h3 className={classes.cardTitle}>Monthly movements</h3>
        <SummaryBox title={'Total incomes:'} total={'$ 1234'} type={1}/>
        <SummaryBox title={'Total expenses:'} total={'$ 1234'} type={2}/>
        <SummaryBox title={'Month incomes:'} total={'$ 1234'} type={1}/>
        <SummaryBox title={'Month expenses:'} total={'$ 1234'} type={2}/>
      </div>
      <div className={`${classes.barsContainer} ${classes.card}`}>
        <h3 className={classes.cardTitle}>Plot</h3>
        <Plot/>
      </div>
      <div className={`${classes.recentsContainer} ${classes.card}`}>
        <h3 className={classes.cardTitle}>Recents</h3>
          <Recents/>
      </div>
    </div>
  )
}

export default withStyles(styles)(Dashboard);