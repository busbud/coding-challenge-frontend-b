import React from 'react';
import createReactClass from 'create-react-class';
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import { translate } from 'react-i18next';

const ResultList = createReactClass({
  getInitialState() {
		return {
      tableHeight: window.innerHeight/3+'px',
      widthScreen: window.innerWidth
		};
  },
  resize: function() {
      this.setState({tableHeight: window.innerHeight/3+'px'});
      this.setState({widthScreen: window.innerWidth});
  },
  componentWillMount: function() {
      this.resize();
  },
  componentDidMount: function() {
      window.addEventListener('resize', this.resize);
  },
  componentWillUnmount: function() {
      window.removeEventListener('resize', this.resize);
  },

  thumbsize(myUrl, mySize=100){
    mySize = ( this.state.widthScreen > 544)? mySize : 60;

    if(myUrl){
      myUrl = myUrl.replace('{height}', mySize);
      myUrl = myUrl.replace('{width}', mySize);
    }else{
      myUrl = `http://via.placeholder.com/${mySize}x${mySize}?text=Generic+image`;
    }
    return myUrl;
  },

  displayPrice(myPrice){
    const { amount, currency } = myPrice;
    let myCurrency;
    switch(currency){
      case 'USD': myCurrency = '$ USD'; break;
      case 'CAD': myCurrency = '$ CAD'; break;
      case 'EUR': myCurrency = '€'; break;
      default: myCurrency = '$ USD'; break;
    }
    return `${ (amount/100).toFixed(2)} ${myCurrency}`;
  },


  render(){
    const { t, i18n } = this.props;
    const { cityFrom, cityTo } = this.props.results;
    const { rowColumn, textCenter } = styles;
    return (
      <div className="results-container"> 
        { this.props.results.travels && this.props.results.travels.length === 0 
          && !this.props.isLoading &&
        <div className="no-result">
          <div className="meh-container">
            <i className="far fa-meh"></i>
          </div>
          {t('ResultList.Sorry there is no result')}
        </div>
        }
        { this.props.results.travels && this.props.results.travels.length > 0 &&
        <div>
          <div className="detail-travel-bar container">
            <div className="detail-travel-text row">
              {/* lg & > */}
              <div className="hidden-md-down col-lg-12">
                <span className="big-text">{this.props.results.travels.length}</span>
                <span className="regular-text">{t('ResultList.Travels From')}</span>
                <span className="big-text">{cityFrom.name}</span>
                <span className="regular-text">{t('ResultList.To')}</span>
                <span className="big-text">{cityTo.name}</span>
                <span className="regular-text">{t('ResultList.on')}</span>
                <span className="big-text">{ this.props.formatDateTime(this.props.results.travelDate, i18n.language) }</span>
              </div>
              {/* md */}
              <div className="col-md-12 hidden-sm-down hidden-lg-up">
                <span className="big-text">{this.props.results.travels.length}</span>
                <span className="regular-text">{t('ResultList.Travels From')}</span>
                <span className="big-text">{cityFrom.name}</span>
                <span className="regular-text">{t('ResultList.To')}</span>
                <span className="big-text">{cityTo.name}</span>
              </div>
              {/* xs & sm */}
              <div className="col-12 hidden-md-up">
                <span className="big-text">{this.props.results.travels.length}</span>
                <span className="regular-text">{t('ResultList.Travels From')}</span>
                <span className="big-text">{cityFrom.name}</span>
              </div>
              <div className="col-12 hidden-md-up">
                <span className="regular-text">{t('ResultList.To')}</span>
                <span className="big-text">{cityTo.name}</span>
              </div>
              {/* xs, sm & md */}
              <div className="col-12 hidden-lg-up">
                <span className="regular-text">{t('ResultList.on')}</span>
                <span className="big-text">{ this.props.formatDateTime(this.props.results.travelDate, i18n.language) }</span>
              </div>
            </div>
            <div className="detail-travel-pictures row">
              <div className="left-part col-6">
                <img 
                  src={this.thumbsize(cityFrom.image)}
                  alt={cityFrom.name} 
                />
              </div>
              <div className="right-part col-6">
                <img 
                  src={this.thumbsize(cityTo.image, 100)}
                  alt={cityFrom.name} 
                />
              </div>
            </div>
          </div>
          <Table
            height={this.state.tableHeight}
            fixedHeader={true}
            className='table-results'
          >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow style={textCenter}>
                <TableHeaderColumn 
                  tooltip={t('ResultList.Operator Company')}
                  style={textCenter}
                  className="table-title">
                  {t('ResultList.Operator')}
                </TableHeaderColumn>
                <TableHeaderColumn 
                  tooltip={t('ResultList.Departure time and location')}
                  style={textCenter}
                  className="table-title">
                  {t('Common.Departure')}
                </TableHeaderColumn>
                <TableHeaderColumn 
                  tooltip={t('ResultList.Arrival time and location')}
                  style={textCenter}
                  className="table-title">
                  {t('Common.Arrival')}
                </TableHeaderColumn>
                <TableHeaderColumn 
                  tooltip={t('ResultList.Price')}
                  style={textCenter}
                  className="table-title">
                  {t('ResultList.Price')}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover={true}
              stripedRows={true}
            >
              {this.props.results.travels.map( (travel, index) => (
                <TableRow key={index}>
                  <TableRowColumn style={rowColumn}>
                    <img 
                      src={this.thumbsize(travel.operator.logo)} 
                      alt={travel.operator.name}
                    />
                  </TableRowColumn>
                  <TableRowColumn style={rowColumn}>
                    <div><strong>{cityFrom.name}</strong></div>
                    <div>{this.props.formatDateTime(travel.departure.time, i18n.language, true)}</div>
                    <div><em>{travel.departure.location.name }</em></div>
                  </TableRowColumn>
                  <TableRowColumn style={rowColumn}>
                    <div><strong>{cityTo.name}</strong></div>
                    <div>{this.props.formatDateTime(travel.arrival.time, i18n.language, true)}</div>
                    <div><em>{travel.arrival.location.name }</em></div>
                  </TableRowColumn>
                  <TableRowColumn style={rowColumn}>{this.displayPrice(travel.price)}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        }
      </div>
    );
  },
});

const styles = {
  rowColumn: {
    textAlign: 'center',
    whiteSpace: 'normal',
  },
  textCenter:{
    textAlign: 'center'
  }
};

export default translate('translations')(ResultList);
