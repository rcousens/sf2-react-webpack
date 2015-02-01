var React = require('react');

var DashboardScreen = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="jumbotron">
                    <h2>Dashboard</h2>
                </div>
            </div>
        );
    }
});

module.exports = {
    DashboardScreen: DashboardScreen
};