import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import moment from 'moment';
import './index.scss';
import { Card, Button, Icon } from 'antd';

class Result extends Component {

	getPrice = (price) => {
		return Math.round((price / 100))
	}

	render() {

		const { t } = this.props;

		return(
				<Card>
					<div className="row">
						<div className="col-12 d-flex align-items-center justify-content-between">
							<ul className="flex-grow-1 p-0 m-0 mr-4 list-unstyled">
								<li className="d-flex pb-2 border-bottom">
									<span className="mr-2 d-flex align-items-center">
										<Icon type="environment"
													theme="twoTone"
													className="mr-1"/>
										<strong>
											{moment(this.props.departure.departure_time).format('HH:mm')}
											</strong>
									</span>
									<span>
										{this.props.originLocation.name}
									</span>
								</li>
								<li className="d-flex pt-2">
									<span className="mr-2 d-flex align-items-center">
										<Icon type="environment"
													theme="twoTone"
													twoToneColor="#52c41a"
													className="mr-1"/>
										<strong>
											{moment(this.props.departure.arrival_time).format('HH:mm')}
											</strong>
									</span>
									<span>
										{this.props.destinationLocation.name}
									</span>
								</li>
							</ul>
							<div className="position-relative">
								<Button type="primary" target="_blank" href={this.props.departure.links.deeplink}>
									<strong>
										{ t('book') } ${ this.getPrice(this.props.departure.prices.total) }
									</strong>
								</Button>
								<small className="mt-1">
									{ t('with') } { this.props.operator.display_name }
								</small>
							</div>

						</div>
					</div>
				</Card>
		)
	}


	static propTypes = {
		departure: PropTypes.shape({
			departure_time: PropTypes.string,
			arrival_time: PropTypes.string,
			prices: PropTypes.shape({
				total: PropTypes.number
			}),
			links: PropTypes.shape({
				deeplink: PropTypes.string
			})
		}),
		destinationLocation: PropTypes.shape({
			name: PropTypes.string
		}),
		originLocation: PropTypes.shape({
			name: PropTypes.string
		}),
		operator: PropTypes.shape({
			display_name: PropTypes.string
		})
	};
}

export default translate('common')(Result);