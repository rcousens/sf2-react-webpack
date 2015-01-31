var Reflux = require('reflux');
var LoginActions = require('./login-actions.js');

var data = {
    message: '',
    username: '',
    errors: {}
};

var LoginStore = Reflux.createStore({
    listenables: [LoginActions],
    onRegistrationSuccessful: function(message) {
        this.updateMessage(message);
        this.updateErrors({});
    },
    onRegistrationFailed: function(errors) {
        this.updateErrors(errors);
        this.updateMessage('');
    },
    onUsernameChange: function(username) {
        this.updateUsername(username);
    },
    updateUsername: function(username) {
        data.username = username;
        this.trigger(data);
    },
    updateMessage: function(message) {
        data.message = message;
        this.trigger(data);
    },
    updateErrors: function(errors) {
        data.errors = errors;
        this.trigger(data);
    },
    getInitialState: function() {
        return data;
    }
});

module.exports = LoginStore;
