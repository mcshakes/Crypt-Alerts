import React from "react";
import IOClient from "socket.io-client";

class SnapshotChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      response: false,
      endpoint: `/snapshot-io`
    };
  }

  componentDidMount() {
    const ticker = this.props.ticker
    const { endpoint } = this.state;

    const connect = function(namespace) {
      return IOClient(namespace, {
        query: "namespace=" + ticker,
        resource: "socket.io"
      });
    }

    const socket = connect(endpoint);

    socket.on("FromAPI", data => {
      this.setState({
        data: data
      })
    })
  }

  render() {
    if (this.state.data) {
      const aggData = this.state.data.Data.AggregatedData

      const lastMarket = aggData.LASTMARKET
      const change24Hour = aggData.CHANGE24HOUR
      const pctChange = aggData.CHANGEPCT24HOUR
      const openDay = aggData.OPENDAY
      const highDay = aggData.HIGHDAY
      const lowDay = aggData.LOWDAY
      const totalVolume = aggData.TOTALVOLUME24HTO
      const lastVolume = aggData.LASTVOLUME
      const lastVolumeTo = aggData.LASTVOLUMETO
      const volume24 = aggData.VOLUME24HOUR
      const volume24HourTo = aggData.VOLUME24HOURTO
      const openHour = aggData.OPEN24HOUR
      const highHour = aggData.HIGH24HOUR
      const lowHour = aggData.LOW24HOUR

      return (
        <div>
                <h5>
                  24h Change: <span id="CHANGE24HOUR">{change24Hour}</span>
                  <span className="pct-change" id="CHANGE24HOUR">{pctChange}</span>
                </h5>
  							<h5>Last Market: <span class="exchange" id="LASTMARKET">{lastMarket}</span></h5>
  							<h5>Open Hour: <span id="OPENHOUR">{openHour}</span></h5>
  							<h5>High Hour: <span id="HIGHHOUR">{highHour}</span></h5>
  							<h5>Low Hour: <span id="LOWHOUR">{lowHour}</span></h5>
  							<h5>Open Day: <span id="OPEN24HOUR">{openHour}</span></h5>
  							<h5>High Day: <span id="HIGH24HOUR">{highHour}</span></h5>
  							<h5>Low Day: <span id="LOW24HOUR">{lowHour}</span></h5>
  							<h5>Last Trade Volume: <span id="LASTVOLUME">{lastVolume}</span></h5>
  							<h5>Last Trade Volume To: <span id="LASTVOLUMETO">{lastVolumeTo}</span></h5>
  							<h5>24h Volume: <span id="VOLUME24HOUR">{volume24}</span></h5>
  							<h5>24h VolumeTo: <span id="VOLUME24HOURTO">{volume24HourTo}</span></h5>
                <h5>Total Volume (USD): <span id="TOTALVOLUME24HTO"> {totalVolume}</span></h5>
        </div>
      );

    } else {
      return (
        <div>
          Waiting for data
        </div>
      )
    }
  }
}

export default SnapshotChart;
