import React from "react";
import SearchManager from "../../components/SearchManager/SearchManager";

class Dashboard extends React.Component {
    render() {
        return (
            <main>
                <section className="head">
                    <h1>This is User Dashboard</h1>
                </section>

                <section className="search-engine">
                    <SearchManager />
                </section>
            </main>
        )
    }
}

export default Dashboard;
