var ReactRouter = require('react-router');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var NotFoundRoute = require('react-router').NotFoundRoute;
var RouteHandler = require('react-router').RouteHandler;

var Navigation = require('react-router').Navigation;
var TopNavBar = require('../top-nav-bar').TopNavBar;

var React = require('react');

var start = Date.now();

var loginCallback;
var logoutCallback;

var App = React.createClass({
    mixins: [Navigation],
    getInitialState: function() {
        return({
            loggedIn: false,
            token: '',
            username: ''
        })
    },
    componentDidMount: function() {
        var component = this;
        loginCallback = function (token, username) {
            component.setState({
                loggedIn: true,
                token: token,
                username: username
            });
            console.log('from app', component.state);
        };
        logoutCallback = function() {
            component.setState({
                loggedIn: false,
                token: '',
                username: ''
            });
            component.transitionTo('app');
        }
    },
    render: function () {
        return (
            <div id="wrapper">
                <TopNavBar loggedIn={this.state.loggedIn} username={this.state.username} />
                <Content/>
                <Footer start={start} />
            </div>
        );
    }
});

var Index = React.createClass({
    render: function () {
        return <h1>Welcome</h1>;
    }
});

var Stuff = React.createClass({
    render: function () {
        return <h1>Stuff</h1>;
    }
});

var Demo = React.createClass({
    render: function() {
        return (
            <div>
                <h1>React Demo</h1>
                <div className="demo-container">
                    <SearchCriteria />
                </div>
            </div>
        );
    }
});

var Login = React.createClass({
    render: function() {
        return (
            <div>
                <LoginModal />
            </div>
        );
    }
});

var NotFound = React.createClass({
    render: function () {
        return <h1>Not found</h1>;
    }
});
var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Index}/>
        <Route name="app" path="/" handler={Index}/>
        <Route name="stuff" path="/stuff" handler={Stuff}/>
        <Route name="demo" path="/demo" handler={Demo}/>
        <Route name="login" path="/login" handler={Login}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
