import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';

var FilterBar = React.createClass({
    render() {
        return (
            <div>
                <List subheader="General">
                    <ListItem
                        primaryText="Profile photo"
                        secondaryText="Change your Google+ profile photo"
                    />
                    <ListItem
                        primaryText="Show your status"
                        secondaryText="Your status is visible to everyone you use with"
                    />
                </List>
                <Divider />
                <List subheader="Hangout notifications">
                    <ListItem
                        leftCheckbox={<Checkbox />}
                        primaryText="Notifications"
                        secondaryText="Allow notifications"
                    />
                    <ListItem
                        leftCheckbox={<Checkbox />}
                        primaryText="Sounds"
                        secondaryText="Hangouts message"
                    />
                    <ListItem
                        leftCheckbox={<Checkbox />}
                        primaryText="Video sounds"
                        secondaryText="Hangouts video call"
                    />
                </List>
            </div>
        )
    }
});

export default FilterBar;