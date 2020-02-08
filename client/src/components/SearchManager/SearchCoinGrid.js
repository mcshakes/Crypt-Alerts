import React from 'react';

class SearchCoinGrid extends React.Component {
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
                <h2>{this.state.filtered}</h2>
            </div>
        )
    }
}

export default SearchCoinGrid;