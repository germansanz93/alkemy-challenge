import withStyles from '@mui/styles/withStyles';
import React from 'react'
import { RadialChart } from "react-vis";

import style from './styles/PieChartStyles'

function PieChart(props) {
  const { title}  = props;
  return (
    <div className={`pieChart`}>
      <h3>{title}</h3>
      <RadialChart
        getLabel={d => d.label}
        data={[
          { angle: 1, color: "#FFF", name: "blue", opacity: 0.2 },
          { angle: 2, color: "#000", name: "yellow" },
          { angle: 5, color: "#1E96BE", name: "cyan" },
          { angle: 3, color: "#DA70BF", name: "magenta" },
          { angle: 5, color: "#F6D18A", name: "yellow again" }
        ]}
        width={300}
        height={300}
        labelsRadiusMultiplier={1.6}
        labelsStyle={{ fontSize: 16, fill: "#222" }}
      />
    </div>
  )
}

export default withStyles(style)(PieChart);