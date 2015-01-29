var React = require('react');

var RouteHandler = require('react-router').RouteHandler;

var Content = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="jumbotron">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = {
    Content: Content
}