import React, { Component } from 'react';
import './OnboardingScreen.css';
import PropTypes from 'prop-types';
import Strings from './../../strings.js';

class OnboardingScreen extends Component {
  constructor(props) {
    super(props);

    const { originCity, destinationCity, date, numberOfPassengers } = props;

    this.state = {
      originCity,
      destinationCity,
      date,
      numberOfPassengers
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.originCity, this.state.destinationCity, this.state.date, this.state.numberOfPassengers);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  render() {
    return (
      <div>
        
        <h4>{Strings.travelItinerary}</h4>
        <form>
          <fieldset>
            <label>
              <span className="form-label">
                <strong>{Strings.leavingFrom}</strong>
              </span>
              <br />
              <input 
                name="originCity" 
                className="mdl-textfield__input"
                type="text" 
                value={this.state.originCity} 
                onChange={this.handleInputChange}
                disabled />
            </label>
          </fieldset>
          
          <fieldset>
            <label>
              <span className="form-label">
                <strong>{Strings.goingTo}</strong>
              </span>
              <br />
              <input 
                name="destinationCity" 
                className="mdl-textfield__input"
                type="text" 
                value={this.state.destinationCity} 
                onChange={this.handleInputChange}
                disabled /> 
            </label>
          </fieldset>
          
          <fieldset>
            <label>
              <span className="form-label">
                <strong>{Strings.date}</strong>
              </span>
              <br />
              <input 
                name="date" 
                className="mdl-textfield__input"
                type="date" 
                value={this.state.date} 
                onChange={this.handleInputChange}
                disabled />
            </label>
          </fieldset>
          
          <fieldset>
            <label>
              <span className="form-label">
                <strong>{Strings.numberOfPassengers}</strong>
              </span>
              <br />
              <input 
                name="number" 
                className="mdl-textfield__input"
                type="number" 
                value={this.state.numberOfPassengers} 
                onChange={this.handleInputChange}
                disabled />
            </label>
          </fieldset>

          <input className="submit-button" type="submit" value={Strings.search} onClick={this.handleSubmit}/>
        </form>
        <div className="language-switch-container">
          <a className="language-switch" onClick={this.props.onSwitchLanguage}>{Strings.switchLanguage}</a>
        </div>
      </div>
    );
  }
}

OnboardingScreen.propTypes = {
  originCity: PropTypes.string,
  destinationCity: PropTypes.string,
  date: PropTypes.string,
  numberOfPassengers: PropTypes.number,
  onSubmit: PropTypes.func,
  onSwitchLanguage: PropTypes.func
}

export default OnboardingScreen;