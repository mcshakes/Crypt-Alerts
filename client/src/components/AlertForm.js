import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';

class AlertForm extends React.Component {
  render() {
    return (
      <div>
        <form className="alert-form">
          <label>Set High Limit</label>
          <input
            type="text"
            // value={searchValue}
            // onChange={this.searchHandler}
          />
          <label>Set Low Limit</label>
          <input
            type="text"
            // value={searchValue}
            // onChange={this.searchHandler}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AlertForm;
