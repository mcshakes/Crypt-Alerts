import React from "react";
import IOClient from "socket.io-client";
import NumberFormat from 'react-number-format';
import Spinner from "./Spinner"
import '../css/SnapShot.css';


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

    if (this.state.data && this.state.data.Response === "Success") {
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

      const formattedVolume = <NumberFormat value={totalVolume} displayType={"text"} thousandSeparator={true} prefix={'$'} decimalScale={3}/>
      const fChange = <NumberFormat value={change24Hour} displayType={"text"} thousandSeparator={true} prefix={'$'} decimalScale={3} />
      const fPctChange = <NumberFormat value={pctChange} displayType={"text"} thousandSeparator={true} suffix={'%'} decimalScale={3} />

      const fLastVolume = <NumberFormat value={lastVolume} displayType={"text"} thousandSeparator={true} decimalScale={3} />
      const fLastVolumeTo = <NumberFormat value={lastVolumeTo} displayType={"text"} prefix={'$'} thousandSeparator={true} decimalScale={3} />

      const f24hVolume = <NumberFormat value={volume24} displayType={"text"} thousandSeparator={true} decimalScale={3} />
      const f24hVolumeTo = <NumberFormat value={volume24HourTo} displayType={"text"} prefix={'$'} thousandSeparator={true} decimalScale={3} />

      return (
        <div className="coin-metadata">
                <h5>
                  24h Change: <span id="CHANGE24HOUR">{fChange}</span>
                  <span className="pct-change" id="CHANGE24HOUR">{fPctChange}</span>
                </h5>
  							<h5>Last Market: <span className="exchange" id="LASTMARKET">{lastMarket}</span></h5>
  							<h5>Open Hour: <span id="OPENHOUR">{openHour}</span></h5>
  							<h5>High Hour: <span id="HIGHHOUR">{highHour}</span></h5>
  							<h5>Low Hour: <span id="LOWHOUR">{lowHour}</span></h5>
  							<h5>Open Day: <span id="OPEN24HOUR">{openHour}</span></h5>
  							<h5>High Day: <span id="HIGH24HOUR">{highHour}</span></h5>
  							<h5>Low Day: <span id="LOW24HOUR">{lowHour}</span></h5>
  							<h5>Last Trade Volume: <span id="LASTVOLUME">{fLastVolume}</span></h5>
  							<h5>Last Trade Volume To: <span id="LASTVOLUMETO">{fLastVolumeTo}</span></h5>
  							<h5>24h Volume: <span id="VOLUME24HOUR">{f24hVolume}</span></h5>
  							<h5>24h VolumeTo: <span id="VOLUME24HOURTO">{f24hVolumeTo}</span></h5>
                <h5>Total Volume (USD): <span id="TOTALVOLUME24HTO">{formattedVolume}</span></h5>
        </div>
      );

    } else {

        const error = (this.state.data && this.state.data.Response === "Error") ? this.state.data.Message : ""

        return (
          <div>
            <span>{error}</span>
            <Spinner />
          </div>
        )
    }
  }
}

export default SnapshotChart;
