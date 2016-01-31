import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';

var VisibilityLink = React.createClass({
    dispatchAction(){
        const actionType = this.props.actionType;
        const store = this.props.store;

        store.dispatch({
            type: "SORT",
            sortBy: actionType
        });
    },
    render(){
        const text = this.props.text;

        return (
            <ListItem
                primaryText={text}
                onTouchTap={this.dispatchAction}
            />
        )
    }
});

var FilterBar = React.createClass({
    render() {
        const store = this.props.store;
        const lg = store.getState().language;

        return (
            <div className="filter-bar column">
                <List subheader={lg.sortBy || 'sort'}>
                    <VisibilityLink store={store} text='Price' actionType='SORT_BY_PRICE'/>
                    <VisibilityLink store={store} text='Departure time' actionType='SORT_BY_DEPARTURE_TIME'/>

                </List>
                <Divider />
                <List subheader="Filter">
                    <ListItem
                        leftCheckbox={<Checkbox />}
                        primaryText="Operators"
                        secondaryText="list"
                    />
                    <ListItem
                        leftCheckbox={<Checkbox />}
                        primaryText="..."
                        secondaryText=".."
                    />
                    <ListItem
                        leftCheckbox={<Checkbox />}
                        primaryText="..."
                        secondaryText=".."
                    />
                </List>
            </div>
        )
    }
});

export default FilterBar;