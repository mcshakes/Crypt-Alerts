import React from 'react';

class SearchCoinList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filtered: []
        }
    }

    componentDidMount() {
        this.setState({
            filtered: this.props.coins
        })
    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default SearchCoinList;