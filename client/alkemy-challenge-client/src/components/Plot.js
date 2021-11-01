import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, DiscreteColorLegend, XAxis, YAxis } from 'react-vis';
import withStyles from '@mui/styles/withStyles';
import styles from '../styles/PlotStyles';
import {AutoSizer} from 'react-virtualized';

function Plot(props) {
  const { classes, monthBalances } = props;

  return (
    <div className={classes.barsContainer}>
      <AutoSizer>
        {({ height, width }) => (
          <XYPlot height={height} width={width} margin={{left: 60}}>
            <DiscreteColorLegend
              style={{ position: 'absolute', left: '60px', top: '-40px' }}
              orientation="horizontal"
              items={[
                {
                  title: 'Incomes',
                  color: '#12939A'
                },
                {
                  title: 'Expenses',
                  color: '#9a1811'
                }
              ]}
            />
            <VerticalGridLines/>
            <HorizontalGridLines />
            <XAxis tickValues={Array.from({length:12}, (v, i) => i+1)}/>
            <YAxis/>
            <VerticalBarSeries data={monthBalances(1)} />
            <VerticalBarSeries data={monthBalances(2)} color='#9a1811' />
          </XYPlot>
        )}
      </AutoSizer>
    </div>
  )
}

export default withStyles(styles)(Plot);
