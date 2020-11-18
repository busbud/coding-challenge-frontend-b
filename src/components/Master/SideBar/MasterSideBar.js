import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import * as actsMaster from '../../../actions/master/actionsMaster';
import { Translate } from 'react-redux-i18n';

class MasterSideBar extends Component {
  constructor(props) {
      super(props);

      this.state = {
          travelDate: moment(),
      };

      this.changeTravelDate = this.changeTravelDate.bind(this);
    }

    changeTravelDate(date) {
        this.setState({
            travelDate: date,
        });
        this.props.onDateChange(moment(date).format('YYYY-MM-DD')); 
    }

  render() {

    return (

        <div className="detailsbox sticky-top ">

        <div className="card bg-info">
                <div className="card-header text-white">
            <div className="row">

              <div className="col-6">
                            <h6><Translate value="details.FindText" /></h6>
              </div>


              
                <div className="col-6">
                    <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        onChange={this.props.changeLanguageHandler}
                    >
                                <option value="en">Choose Language</option>
                        {this.props.langs.map(lang => (<option key={lang.code} value={lang.code}>{lang.title}</option>))}
                    </select>
                </div>
               


            </div>
          </div>

          <div className="card-body show text-white" id="detailsBoxCollapse">

            <div className="row">
                <div className="col-6">
                            <label htmlFor="fromCity"><Translate value="details.From" /></label>
                    <input type="text" placeholder="Enter a city" value="Quebec" className="form-control" />

                </div>

                <div className="col-6">
                            <label htmlFor="toCity"><Translate value="details.To" /></label>
                    <input type="text" placeholder="Enter a city" value="Montreal" className="form-control" />
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                            <label htmlFor="departDate"><Translate value="details.DepartureDate" /></label>
                    <DatePicker
                        className="form-control"
                                dateFormat="DD MMM YYYY"
                                selected={this.state.travelDate}
                                onChange={this.changeTravelDate}
                    />
                </div>

            </div>
          </div>


          <div className="card-footer">
            <div className="row">
                <div className="col-8 offset-4">
                    <button
                                className="btn btn-sm btn-dark"
                        role="button"
                        aria-expanded="false"
                                aria-controls="detailsBoxCollapse"
                    >

                        <Translate value="details.Search" />
                    </button>
                </div>
            </div>


          </div>

        </div>
      </div>


    );
  }
}

function mapStateToProps(state) {
    return {
    langs: state.getLanguagesReducer
    };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLanguageHandler: actsMaster.changeLanguageAction
  }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(MasterSideBar);
