import React from 'react';

var count = 0;

var Departures = React.createClass({
    componentDidMount(){
        count++
        console.log(count);
        console.log('departures mounted');
    },
    componentWillReceiveProps(){
        count++
        console.log(count);
        console.log('new props');
    },
    render() {
        return (
            <div>
                <h2>Departures</h2>
                <p>{this.props.params.lang}</p>
            </div>
        )
    }
});

export default Departures;
