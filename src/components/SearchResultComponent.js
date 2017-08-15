import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class SearchResultComponent extends React.Component {
	render() {
		return (
			<Table>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn>Departure time</TableHeaderColumn>
						<TableHeaderColumn>Arrival time</TableHeaderColumn>
						<TableHeaderColumn>Location name</TableHeaderColumn>
						<TableHeaderColumn>Price</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody showRowHover={false} displayRowCheckbox={false}>
					{this.props.data.map((departure, index) => (
					<TableRow>
						<TableRowColumn>{departure.departure_time}</TableRowColumn>
						<TableRowColumn>{departure.arrival_time}</TableRowColumn>
						<TableRowColumn>{departure.location_name}</TableRowColumn>
						<TableRowColumn>{departure.prices.total}{departure.prices.currency}</TableRowColumn>
					</TableRow>
					))}
				</TableBody>
			</Table>
		)
	}
};

export default SearchResultComponent;