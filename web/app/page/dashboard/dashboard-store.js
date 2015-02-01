var Reflux = require('reflux');
var DashboardActions = require('./dashboard-actions.js');

var data = {
    username: window.TS.embed.username
};

var DashboardStore = Reflux.createStore({
    listenables: [DashboardActions],
    getInitialState: function() {
        return data;
    }
});

module.exports = DashboardStore;
