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
        <h1>Osheaga</h1>
        <form>
          <fieldset>
            <label>
              Leaving from: 
              <br />
              <input 
                name="originCity" 
                type="text" 
                value={this.state.originCity} 
                onChange={this.handleInputChange}
                disabled />
            </label>
          </fieldset>
          
          <fieldset>
            <label>
              Going to: 
              <br />
              <input 
                name="destinationCity" 
                type="text" 
                value={this.state.destinationCity} 
                onChange={this.handleInputChange}
                disabled /> 
            </label>
          </fieldset>
          
          <fieldset>
            <label>
              Date:
              <br />
              <input 
                name="date" 
                type="date" 
                value={this.state.date} 
                onChange={this.handleInputChange}
                disabled />
            </label>
          </fieldset>
          
          <fieldset>
            <label>
              Number of passengers: 
              <br />
              <input 
                name="" 
                type="number" 
                value={this.state.numberOfPassengers} 
                onChange={this.handleInputChange}
                disabled />
            </label>
          </fieldset>

          <input type="submit" value="Search" onClick={this.handleSubmit}/>
        </form>
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