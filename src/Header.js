import React from 'react';

const Header = () => (
    <div>
        <div className="row">
            <div className="col-12">
                <div className="alert alert-primary" role="alert">
                    Notes<br/>
                    1. Search is fixed between Quebec to Montreal.<br />
                    2. You can change date in datepicker and iniate new search. <br />
                    3. There is a pollig after every request until 'complete; in response is true. <br />
                    4. Polling is after every 2 sec. <br/>
                    5. Pagination after specific number of departures to avoid duplication of data while polling. <br />
                    6. Language can be switeched between English and French. <br/>
                    7. Error Message is not deplayed when departures object comes as empty. Please change dates to get the data.
                </div>
            </div>
        </div>
      <div className="row">
        <div className="col-12 section-spacing">
          <img src="/logos/ReduxLogo.png" />
               Online Bus Booking System
        </div>
      </div>
   </div>
);

export default Header;
