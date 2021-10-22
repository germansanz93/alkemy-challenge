import React from 'react';
import withStyles from '@mui/styles/withStyles';
import SummaryBox from './SummaryBox';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot,  VerticalBarSeries, VerticalGridLines, HorizontalGridLines, DiscreteColorLegend, XAxis, YAxis} from 'react-vis';

import styles from './styles/DashboardStyles';

function Dashboard(props) {
  const { classes } = props;
  const data = [
    {x: 1, y: 10},
    {x: 2, y: 20},
    {x: 3, y: 30},
    {x: 4, y: 40},
    {x: 5, y: 50},
    {x: 6, y: 60},
    {x: 7, y: 70},
    {x: 8, y: 80},
    {x: 9, y: 90},
    {x: 10, y: 100},
    {x: 11, y: 110},
    {x: 12, y: 120}
  ]
  const data2 = [
    {x: 1, y: 10},
    {x: 2, y: 10},
    {x: 3, y: 30},
    {x: 4, y: 10},
    {x: 5, y: 40},
    {x: 6, y: 30},
    {x: 7, y: 20},
    {x: 8, y: 50},
    {x: 9, y: 20},
    {x: 10, y: 0},
    {x: 11, y: 60},
    {x: 12, y: 10}
  ]
  
  return (
    <div className={classes.mainContainer}>
      <h2>Dashboard</h2>
      <div className={classes.summariesContainer}>
        <SummaryBox title={'Total incomes:'} total={'$ 1234'} />
        <SummaryBox title={'Total expenses:'} total={'$ 1234'} />
        <SummaryBox title={'Month incomes:'} total={'$ 1234'} />
        <SummaryBox title={'Month expenses:'} total={'$ 1234'} />
      </div>
      <div className={classes.barsContainer}>
      <XYPlot height={300} width={500}>
      <DiscreteColorLegend
            style={{position: 'absolute', left: '50px', top: '10px'}}
            orientation="horizontal"
            items={[
              {
                title: 'Incomes',
                color: '#12939A'
              },
              {
                title: 'Expenses',
                color: '#683ab7'
              }
            ]}
          />
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={data} />
          <VerticalBarSeries data={data2} color='#683ab7'/>
        </XYPlot>
      </div>
    </div>
  )
}

export default withStyles(styles)(Dashboard);