var React = require('react');
var Navigation = require('react-router').Navigation;
var superagent = require('superagent');
var bluebird = require('bluebird/js/browser/bluebird.js');

var LoginActions = require('../../login-actions.js');

var RegisterScreen = React.createClass({
    mixins: [Navigation],
    getInitialState: function() {
        return {
            email: this.props.username ? this.props.username : '',
            username: this.props.username ? this.props.username : '',
            password: '',
            password_confirm: ''
        };
    },
    handleEmailChange: function(e)
    {
        LoginActions.registrationFailed({});
        LoginActions.usernameChange(e.target.value);
        this.setState({'email': e.target.value, 'username': e.target.value});
    },
    handlePasswordChange: function(e)
    {
        this.setState({'password': e.target.value});
    },
    handlePasswordConfirmChange: function(e)
    {
        this.setState({'password_confirm': e.target.value});
    },
    doRegister: function() {
        var component = this;
        superagent
            .post(window.Routing.generate('user_bundle_register'))
            .type('form')
            .send('fos_user_registration_form[_token]=' + window.TS.embed.register_csrf_token)
            .send('fos_user_registration_form[username]=' + this.state.username)
            .send('fos_user_registration_form[email]=' + this.state.email)
            .send('fos_user_registration_form[plainPassword][first]=' + this.state.password)
            .send('fos_user_registration_form[plainPassword][second]=' + this.state.password_confirm)
            .end(function(err, res) {
                if (res.body.errors) {
                    LoginActions.registrationFailed(res.body.errors);
                } else if (res.body.registration) {
                    LoginActions.registrationSuccessful('Registration successful. Please login.');
                    component.transitionTo('login');
                }
            });
    },
    render: function () {
        var message = this.props.message ? (<p className="help-block">{this.props.message}</p>) : '';
        var emailErrorClass = 'form-group';
        var emailErrorLabel = '';
        if (this.props.errors.email !== undefined) {
            emailErrorClass = 'form-group has-error';
            emailErrorLabel = (<label className="control-label">{this.props.errors.email}</label>);
        }
        var username = this.props.username ? this.props.username : window.TS.embed.last_username;

        return (
            <div className="row">
                <div className="jumbotron">
                    <h2>Register</h2>
                    <form action="#">
                        <div className={emailErrorClass}>
                            <label className="control-label" htmlFor="email">Email Address</label>
                            <input type="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" id="email" name="fos_user_registration_form[email]" placeholder="Email Address" />
                            {emailErrorLabel}
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="username">Username</label>
                            <input type="text" value={this.state.username} disabled="true" className="form-control" id="username" name="fos_user_registration_form[username]" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="password">Password</label>
                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" id="password" name="fos_user_registration_form[plainPassword][first]" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="password_confirm">Confirm Password</label>
                            <input type="password" value={this.state.password_confirm} onChange={this.handlePasswordConfirmChange} className="form-control" id="password_confirm" name="fos_user_registration_form[plainPassword][second]" placeholder="Confirm Password" />
                        </div>
                        <br />
                        <button type="button" onClick={this.doRegister} className="btn btn-primary">Create Account</button>
                        {message}
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = {
    RegisterScreen: RegisterScreen
};