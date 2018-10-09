import React from "react";
import ReactDOM from "react-dom";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";

class LineChart extends React.Component {
  state = {
    data: this.props.data
  }

  render() {
    return (
      <div>
        <VictoryChart>
          <VictoryAxis
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`$${x}`)}
          />
          <VictoryLine
            style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                  }}
            data={this.state.data}
            x="USD"
          />
        </VictoryChart>
      </div>
    )
  }
}

export default LineChart;
