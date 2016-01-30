import React from 'react';

let count = 0;

let Departures = React.createClass({
    componentDidMount(){
        count++;
        console.log(count);
        console.log('departures mounted');

        const {store} = this.props;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());

        store.dispatch({
            type:'FETCH_DEPARTURES'
        })
    },
    componentWillUnmount() {
        this.unsubcribed();
    },
    componentWillReceiveProps(nextProps){

        count++;
        console.log(count);
        console.log('new props');
        console.log(nextProps.params.lang);

        const {store} = this.props;

        store.dispatch({
            type:'FETCH_DEPARTURES'
        })
    },
    render() {
        const {store} = this.props;

        var departures = store.getState().tickets.list || [];

        return (
            <div>
                <h2>Departures</h2>
                <p>{this.props.params.lang}</p>
                <ul>
                    {
                        departures.map((ticket) => {
                            return (
                                <li key={ticket.id}>{ticket.id}</li>
                            )
                        })
                    }
                </ul>

            </div>
        )
    }
});

export default Departures;