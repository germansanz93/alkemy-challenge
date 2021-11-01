import React from 'react';
import withStyles from '@mui/styles/withStyles';
import SummaryBox from './SummaryBox';
import '../../node_modules/react-vis/dist/style.css';

import Plot from './Plot';
import Recents from './Recents';
import styles from '../styles/DashboardStyles';
import ModalForm from './ModalForm';
import FloatingActionBtn from './FloatingActionBtn';

function Dashboard(props) {
  const {
    classes,
    title,
    loading,
    recents,
    categories,
    balance,
    movementsByType,
    monthMovements,
    monthBalances,
    addMovement
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = (e) => {
    e && e.preventDefault();
    setOpen(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.mainContainer}>
      <h2>Dashboard</h2>
      <div className={classes.cardsContainer}>
        <div className={`${classes.balance} ${classes.card}`}>
          <h3 className={classes.cardTitle}>Summary</h3>
          <SummaryBox title={'Balance'} total={balance} type={1} />
        </div>
        <div className={`${classes.summariesContainer} ${classes.card}`}>
          <h3 className={classes.cardTitle}>Monthly movements</h3>
          <div className={classes.innerSummaries}>
            <SummaryBox className={classes.summaryBox} title={'Total incomes:'} total={movementsByType(1)} type={1} />
            <SummaryBox className={classes.summaryBox} title={'Total expenses:'} total={movementsByType(2)} type={2} />
            <SummaryBox className={classes.summaryBox} title={'Month incomes:'} total={monthMovements(new Date().getMonth(), 1)} type={1} />
            <SummaryBox className={classes.summaryBox} title={'Month expenses:'} total={monthMovements(new Date().getMonth(), 2)} type={2} />
          </div>
        </div>
        <div className={`${classes.barsContainer} ${classes.card}`}>
          <h3 className={classes.cardTitle}>Plot</h3>
          <Plot monthBalances={monthBalances} />
        </div>
        <div className={`${classes.recentsContainer} ${classes.card}`}>
          <h3 className={classes.cardTitle}>Recents</h3>
          <Recents className={classes.recents} recents={recents} />
        </div>
      </div>
      <FloatingActionBtn title={title} onClick={handleOpen} />
      <ModalForm open={open} handleClose={handleClose} addMovement={addMovement} categories={categories}/>
    </div>
  )
}

export default withStyles(styles)(Dashboard);