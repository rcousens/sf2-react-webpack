var Reflux = require('reflux');

var LoginActions = Reflux.createActions([
    "registrationSuccessful",
    "registrationFailed",
    "usernameChange"
]);

module.exports = LoginActions;