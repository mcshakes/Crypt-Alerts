import React from "react";

class Dashboard extends React.Component {
    render() {
        console.log("DASHBOARD STATE", this.state)
        return (
            <div>
                <h1>This is User Dashboard</h1>
            </div>
        )
    }
}

export default Dashboard;
