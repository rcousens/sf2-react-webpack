var React = require('react');

var LoginActions = require('../../login-actions.js');

var ForgotScreen = React.createClass({
    handleUsernameChange: function(e) {
        LoginActions.usernameChange(e.target.value);
    },
    render: function () {
        var username = this.props.username ? this.props.username : '';
        return (
            <div className="row">
                <div className="jumbotron">
                    <h2>Forgot Password?</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email Address</label>
                            <input type="email" defaultValue={username} onChange={this.handleUsernameChange} className="form-control" id="inputEmail" placeholder="Email Address" />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-default">Send Reset Password Email</button>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = {
    ForgotScreen: ForgotScreen
};