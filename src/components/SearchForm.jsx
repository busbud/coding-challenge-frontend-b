import React from 'react';
import createReactClass from 'create-react-class';
import { DatePicker, RaisedButton, AutoComplete } from 'material-ui';
import areIntlLocalesSupported from 'intl-locales-supported';
import IntlPolyfill from 'intl';
import { translate } from 'react-i18next';

const SearchForm = createReactClass({
	getInitialState() {
		// Hardcoded values for the test (would come from the store on a real app)
		const departureCities = [{text:'New York', value:'dr5reg'}];
		const arrivalCities = [{text:'Montréal', value:'f25dvk'}];

		return {
			departureCities,
			arrivalCities,
			departure: {text:'', value:''},
			arrival: {text:'', value:''},
			travelDate: ''
		};
  },
  
  onChange(field, value) {
		this.setState({
				[field]: value,
				warning: false
		});
	},

	renderDatePicker(myLanguage){
		let DateTimeFormat;
		if (areIntlLocalesSupported(['fr'])) {
			DateTimeFormat = global.Intl.DateTimeFormat;
		} else {
			
			DateTimeFormat = IntlPolyfill.DateTimeFormat;
			// require('intl/locale-data/jsonp/fr');
		}

		if(myLanguage === 'en'){
			return (
				<DatePicker 
					autoOk={true}
					minDate={new Date()}
					onChange={(event, travelDate) => this.onChange('travelDate', travelDate)}
					hintText={this.props.t('SearchForm.Choose a date')} 
				/>
			);
		}
		return (
			<DatePicker 
				autoOk={true}
				locale='fr'
				DateTimeFormat={DateTimeFormat}
				cancelLabel={this.props.t('SearchForm.Cancel')}
				minDate={new Date()}
				onChange={(event, travelDate) => this.onChange('travelDate', travelDate)}
				hintText={this.props.t('SearchForm.Choose a date')} 
			/>
		);
	},

	updateAutocomplete(){

	},

	save() {
		if( this.state.departure.value 
		&& this.state.arrival.value
		&& this.state.travelDate){
			this.setState({warning: false});
			this.props.getResults(
				this.state.departure.value,
				this.state.arrival.value,
				this.state.travelDate
			);
		}else{
			this.setState({warning: true});
		}
	},
	
  render() {
		// console.log('render searchform');console.log(this.props);
		const { t, i18n } = this.props;
		// const searchIcon = (<IconButton><SearchIcon color='white' style={{ marginTop: '-4px' }} /></IconButton>);
		const searchIcon = (<i className="material-icons" style={{marginTop:'8px'}}>&#xE8B6;</i>);
    return(
			<div className="container search-container">
				<div className="row search-form">
					<div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
						<AutoComplete
							ref={'departureAc'}
							dataSource={this.state.departureCities}
							floatingLabelText={t('Common.Departure')}
							hintText={t('SearchForm.Start to type and select')}
							filter={AutoComplete.caseInsensitiveFilter}
							onNewRequest={(city) => this.onChange('departure', city)}
						/>
					</div>
					<div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
						<AutoComplete
							ref={'arrivalAc'}
							dataSource={this.state.arrivalCities}
							floatingLabelText={t('Common.Arrival')}
							hintText={t('SearchForm.Start to type and select')}
							filter={AutoComplete.caseInsensitiveFilter}
							onNewRequest={(city) => this.onChange('arrival', city)}
						/> 
					</div>
					<div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 date-picker">
						{this.renderDatePicker(i18n.language)}
					</div>
					<div className="col-sm-12 col-md-6 offset-lg-4 col-lg-4 offset-xl-1 col-xl-2 raised-button">
						<RaisedButton 
							label={searchIcon} 
							className="search-button"
							primary={true} 
							onTouchTap={this.save} 
						/>
					</div>
				</div>
				{this.state.warning && 
				<div className="row">
					<div className="warning col-sm-12 offset-md-6 col-md-6 offset-lg-4 col-lg-4 offset-xl-10 col-xl-2">
						{t('SearchForm.All fields are required')}
					</div>
				</div>
				}
			</div>
    );
  },
});

export default translate('translations')(SearchForm);
