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

        let res = await axios(config)

        // console.log(res.data)
        this.setState({
            coins: res.data
        })
        // axios
        //     .then(response => {
        //         return response.data
        //     })
        //     .then(jsonRes => {
        //         this.setState({
        //             coins: jsonRes
        //         })
        //     })
    }

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
