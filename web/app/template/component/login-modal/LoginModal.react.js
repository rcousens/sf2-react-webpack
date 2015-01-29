var React = require('react');
var Navigation = require('react-router').Navigation;
var superagent = require('superagent');

var LoginModal = React.createClass({
    mixins: [ Navigation ],
    getInitialState: function() {
        return {
            username: '',
            password: '',
            message: ''
        };
    },
    doLogin: function() {
        this.props.loginCallback();
        var component = this;
        component.setState({message: 'Logged in.'});
        component.transitionTo('demo');

        return;
        var component = this;
        var username = this.state.username;
        superagent
            .post('http://api.local.dev/api/login_check')
            .type('form')
            .send(this.state)
            .end(function(err, res) {
                if (res.text && ! _.isEmpty(JSON.parse(res.text)['token'])) {
                    var token = JSON.parse(res.text)['token'];
                    superagent
                        .get('http://api.local.dev/api/me')
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(err, res) {
                            loginCallback(token, JSON.parse(res.text)['username']);
                            component.setState({message: 'Logged in.'});
                            component.transitionTo('demo');
                        });


                } else {
                    token = '';
                    component.setState({message: 'Bad credentials.'});
                }
            });
        //this.setState({password: ''});
    },
    handleUsernameChange: function(e) {
        this.setState({username: e.target.value});
    },
    handlePasswordChange: function(e) {
        this.setState({password: e.target.value});
    },
    render: function () {
        var message = this.state.message;
        return (
            <form>
                <div className="form-group">
                    <label for="username">Username</label>
                    <input id="username" className="form-control" name="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input id="password" className="form-control" name="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </div>
                <button type="button" className="btn btn-default" onClick={this.doLogin}>Login</button>
                <div>{message}</div>
            </form>

        );
    }
});

module.exports = {
    LoginModal: LoginModal
};