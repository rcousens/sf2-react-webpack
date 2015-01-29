
var bootstrap = require('bootstrap');
require('bootstrap/less/bootstrap.less');
require('font-awesome/less/font-awesome.less');

var React = require('react');
var ReactRouter = require('react-router');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var NotFoundRoute = require('react-router').NotFoundRoute;
var RouteHandler = require('react-router').RouteHandler;

var Navigation = require('react-router').Navigation;
var TopNavBar = require('./template/component/top-nav-bar/TopNavBar.react.js').TopNavBar;
var Content = require('./template/component/content/Content.react.js').Content;
var Footer = require('./template/component/footer/Footer.react.js').Footer;
var LoginModal = require('./template/component/login-modal/LoginModal.react.js').LoginModal;
var SearchCriteria = require('./template/component/search-criteria/SearchCriteria.react.js').SearchCriteria;


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
                token: 'test',
                username: 'test'
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
                <TopNavBar loggedIn={this.state.loggedIn} username={this.state.username} logoutCallback={logoutCallback} />
                <Content />
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
                <LoginModal loginCallback={loginCallback} />
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
