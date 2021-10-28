import React from 'react'
import { RadialChart } from "react-vis";

export default function PieChart(props) {
  const { title}  = props;
  return (
    <div>
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
        labelsRadiusMultiplier={1.6}
        labelsStyle={{ fontSize: 16, fill: "#222" }}
        width={400}
        height={400}
      />
    </div>
  )
}
