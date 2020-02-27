import React from "react";
import axios from "axios";
import { connect } from 'react-redux';

import store from "../../store";

class UserWatchlist extends React.Component {
    state = {
        coins: []
    }


    componentDidMount() {
        this.loadCurrencyWatchlist()
    }

    loadCurrencyWatchlist = async () => {
        const token = this.props.auth.token;
        const userId = this.props.auth.user._id;

        const config = {
            url: "/api/watchlist",
            method: "get",

            params: { user: userId },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': token
            }
        }

        let res = await axios(config);
        // return res.data;

        this.setState({
            coins: res.data
        })
    }

    render() {
        const length = this.state.coins.length;

        return (
            <div>
                <h3>You have {length} coins being watched</h3>

                {this.state.coins.map((coin, idx) => {
                    return <div key={idx} className="watched-currency">
                        <h3>{coin.ticker}</h3>
                        <h3>{coin.price}</h3>
                    </div>
                })}
            </div>

        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(UserWatchlist);
