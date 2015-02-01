var React = require('react');
var Link = require('react-router').Link;
var State = require('react-router').State;

var TopNavBar = React.createClass({
    render: function () {

        var dashboardActive = (this.props.active === 'dashboard') ? 'active' : '';
        var teamActive = (this.props.active === 'team') ? 'active' : '';
        var username = this.props.username;
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Team Spirit</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className={dashboardActive}><Link to="dashboard">Dashboard</Link></li>
                            <li className={teamActive}><a href="#">Team</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><i className="fa fa-fw fa-user"></i>{username}</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
});

module.exports = {
    TopNavBar: TopNavBar
};