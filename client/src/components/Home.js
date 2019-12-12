import React from "react";
import DatePicker from "react-datepicker";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <h1>Find your way to Osheaga</h1>
      <form className="home__search">
        <div className="home__search__fields">
          <div className="home__search__fields__input">
            <label htmlFor="from">From</label>
            <input id="from" type="text" name="from" />
          </div>
          <div className="home__search__fields__input">
            <label htmlFor="to">To</label>
            <input id="to" type="text" name="to" />
          </div>
          <div className="home__search__fields__input">
            <label htmlFor="date">When</label>
            <DatePicker />
          </div>
        </div>
        <input className="home__search__submit" type="submit" value="Search" />
      </form>
    </div>
  );
};
export default Home;
