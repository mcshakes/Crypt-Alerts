import React from "react";
import { connect } from 'react-redux';

import store from "../../store";

class UserWatchlist extends React.Component {

    render() {
        return (
            <h1>HELLO</h1>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(UserWatchlist);
