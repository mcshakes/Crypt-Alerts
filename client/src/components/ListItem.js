import React from "react";
import Client from "../Client";

class ListItem extends React.Component {
  render() {
    return (
      <div>
        <div className="leader-coin">
          {this.props.coin}
        </div>
      </div>
    )
  }
}

export default ListItem;
