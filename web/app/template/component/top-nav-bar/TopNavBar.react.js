var React = require('react');
var Link = require('react-router').Link;
var State = require('react-router').State;

var TopNavBar = React.createClass({
    mixins: [ State ],
    logout: function() {
        this.props.logoutCallback();
    },
    render: function () {
        var homeActive = this.isActive('app') ? 'active' : '';
        var stuffActive, demoActive, loginActive = '';
        if (this.props.loggedIn) {
            stuffActive = this.isActive('stuff') ? 'active' : '';
            demoActive = this.isActive('demo') ? 'active' : '';
            loginActive = this.isActive('login') ? 'active' : '';
        }
        var loggedIn = this.props.loggedIn ? <li><a href="#" onClick={this.logout}>Logout ({this.props.username})</a></li> : <li className={loginActive}><Link to="login">Login</Link></li>;

        var navbar;
        if (this.props.loggedIn) {
            navbar = (<div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li className={homeActive}><Link to="app">Home</Link></li>
                    <li className={stuffActive}><Link to="stuff">Stuff</Link></li>
                    <li className={demoActive}><Link to="demo">React Demo</Link></li>
                    <li><Link to="/nowhere" className="nav-link">Nowhere</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                        {loggedIn}
                </ul>
            </div>);
        } else {
            navbar = (<div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li className={homeActive}><Link to="app">Home</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                        {loggedIn}
                </ul>
            </div>);

        }

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
                        <a className="navbar-brand" href="#">Project name</a>
                    </div>
            {navbar}
                </div>
            </nav>
        )
    }
});

module.exports = {
    TopNavBar: TopNavBar
};