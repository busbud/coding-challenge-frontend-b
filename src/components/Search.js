import React, { useState, useContext } from 'react'
import BusbudContext from '../context/busbud/busbudContext';

const Search = () => {
    const busbudContext = useContext(BusbudContext);
    const [form, setValues] = useState({
        origin: 'dr5reg',
        destination: 'f25dvk',
        date: '2020-08-02',
        adults: 1,
        children: 0,
        seniors: 0
    });

    const onSubmit = (e) => {
        e.preventDefault();
        busbudContext.searchDepartures(form.origin, form.destination, form.date, form.adults, form.children, form.seniors);
    };

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
          });
    };
        return (
            <div className="s009">
                <form onSubmit={onSubmit}>
                    <div className="inner-form">
                        <div className="advance-search">
                        <span className="desc">{busbudContext.english?'SEARCH':'CHERCHER'}</span>
                        <div className="row">
                            <div className="input-field">
                                <select className="input-select" name="origin" placeholder="City Origin" value={form.origin} onChange={onChange}>
                                        <option className="choices" value="dr5reg" >New York</option>
                                        <option className="choices" value="f25dvk">Montreal</option>
                                </select>
                            </div>
                            <div className="input-field">
                                <select className="input-select" name="destination" placeholder="City Destination" value={form.destination} onChange={onChange}>
                                        <option className="choices" value="dr5reg">New York</option>
                                        <option className="choices" value="f25dvk">Montreal</option>
                                </select>
                            </div>
                                <input className="input-field" type="date" name="date" placeholder="Departure Date" min='2019-09-10' value={form.date} onChange={onChange}/>
                        </div>
                        <div className="row second">
                            <input className="input-field" type="number" name="adults" min="1" placeholder="Adults" value={form.adults} onChange={onChange}/>
                            <input className="input-field" type="number" name="children" min="0" placeholder="Children" value={form.children} onChange={onChange}/>
                            <input className="input-field" type="number" name="seniors" min="0" placeholder="Seniors" value={form.seniors} onChange={onChange}/>
                        </div>
                            <input type="submit" value={busbudContext.english?'Search':'Chercher'} className="btn btn-dark btn-block"/>
                            {busbudContext.departures.length > 0 && (
                        <button className='btn btn-light btn-block' onClick={busbudContext.clearDepartures}>
                            {busbudContext.english?'Clear':'Effacer'}
                        </button>
                )}
                    </div>
                    </div>
                </form>
            </div>
        )
}

export default Search
