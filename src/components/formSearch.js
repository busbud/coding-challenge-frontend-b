import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Translation } from '../languages/lang';

export class FormSearch extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
	onChange(e) {}
	render() {
		return (
			<Form onSubmit={this.props.formSubmit} className="text-left form-search">
				<div className="row hero-content-block text-center">
					<h1 className="hero">{Translation.hero}</h1>
					<Col xs="12" sm="12" md="3" lg="3" className="cols">
						<FormGroup>
							<Input
								disabled
								type="text"
								name="origin"
								id="origin"
								value={this.props.originCityName}
								onChange={this.onChange}
								placeholder={Translation.placeholderOrigin}
							/>
							<label>{Translation.origin}</label>
						</FormGroup>
					</Col>
					<Col xs="12" sm="12" md="3" lg="3" className="cols">
						<FormGroup>
							<Input
								disabled
								type="text"
								name="destination"
								id="destination"
								value={this.props.destinationCityName}
								onChange={this.onChange}
								placeholder={Translation.placeholderDestination}
							/>
							<label>{Translation.destination}</label>
						</FormGroup>
					</Col>
					<Col xs="12" sm="12" md="3" lg="3" className="cols">
						<FormGroup>
							<div className="input-group">
								<div className="input-group-prepend">
									<div className="input-group-text">
										<FontAwesomeIcon icon="calendar-alt" />
									</div>
								</div>
								<Input
									disabled
									type="text"
									name="date"
									id="date"
									value={this.props.dateFormat}
									onChange={this.onChange}
								/>
							</div>
							<label>{Translation.date}</label>
						</FormGroup>
					</Col>
					<Col
						xs="12"
						sm="12"
						md="2"
						lg="2"
						className="cols btn-area"
					>
						<FormGroup>
							<Button
								color="primary"
								disabled={this.props.submitted}
							>
								<FontAwesomeIcon icon="search" />{' '}
								{Translation.searchBtn}
							</Button>
						</FormGroup>
					</Col>
				</div>
			</Form>
		);
	}
}
