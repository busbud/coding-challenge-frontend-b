import React, { Component } from 'react';
import './OnboardingScreen.css';
import PropTypes from 'prop-types';

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
        
        <h4>Travel Itinerary</h4>
        <form>
          <fieldset>
            <label>
              <span className="form-label">
                <strong>Leaving from:</strong>
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
                <strong>Going to: </strong>
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
                <strong>Date: </strong>
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
                <strong>Number of passengers: </strong>
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

          <input className="submit-button" type="submit" value="Search" onClick={this.handleSubmit}/>
        </form>
        <div className="language-switch-container">
          <a className="language-switch">French</a>
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
  onSubmit: PropTypes.func
}

export default OnboardingScreen;