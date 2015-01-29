var React = require('react');

var Footer = React.createClass({
    getInitialState: function(){
        return { elapsed: 0 };
    },

    componentDidMount: function(){
        this.timer = setInterval(this.tick, 100);
    },

    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    tick: function(){
        this.setState({elapsed: new Date() - this.props.start});
    },
    render: function () {
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
        var deadponies = ((((elapsed / 10) + Math.log(elapsed)) * Math.pow(2, 4)) / 3).toFixed(0);
        var message =
            deadponies + ' ponies have died while app has been running for ' + seconds + ' seconds.';
        return (
            <footer className="footer">
                <div className="container">
                    <p className="text-muted">&copy; Stork Patrol 2014 - {message}</p>
                </div>
            </footer>
        );
    }
});

module.exports = {
    Footer: Footer
};