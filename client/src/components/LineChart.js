import React from "react";
import ReactDOM from "react-dom";
import { VictoryArea, VictoryChart, VictoryAxis } from "victory";

class LineChart extends React.Component {
  state = {
    price: this.props.data
  }

  render() {
    return (
      <div>
        <VictoryChart>
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`$${x}`)}
          />
          <VictoryAxis
          />
          <VictoryArea
            style={{ data: { fill: "#c43a31" } }}
            data={[ { price: this.state.price } ]}

            x="Date"
            y="USD"
          />
        </VictoryChart>
      </div>
    )
  }
}

export default LineChart;
