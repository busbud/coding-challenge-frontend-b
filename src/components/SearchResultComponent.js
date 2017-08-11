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
					<TableRow>
						<TableRowColumn></TableRowColumn>
						<TableRowColumn></TableRowColumn>
						<TableRowColumn></TableRowColumn>
						<TableRowColumn></TableRowColumn>
					</TableRow>
				</TableBody>
			</Table>
		)
	}
};

export default SearchResultComponent;