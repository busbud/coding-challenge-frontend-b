/**
 * @jsx React.DOM
 */

var App = React.createClass({
    getInitialState: function(){
        return{
            searchResults: [],
            search_status: false
        }
    },
    showResults: function(response){
        final_departure_list = new Array()
        departure_list = response.departures
        operator_obj_list = response.operators
        location_obj_list = response.locations
        stop_list = response.cities
        origin_city_id = response.origin_city_id
        destination_city_id = response.destination_city_id
        $.each(departure_list, function(index, depart_item){
            departure_obj = {}
            departure_obj.departure_time = moment(depart_item.departure_time).format("HH:MM");
            departure_obj.arrival_time = moment(depart_item.arrival_time).format("HH:MM");
            departure_obj.link = depart_item.links.deeplink
            departure_obj.price = depart_item.prices.total/100
            departure_obj.class = depart_item.class
            depart_location_id = depart_item.origin_location_id
            $.each(location_obj_list, function(index, location_obj){
                if(depart_location_id == location_obj.id){
                    departure_obj.depart_location = location_obj.name
                }
            })
            $.each(stop_list, function(index, city_obj){
                if(origin_city_id == city_obj.id){
                    departure_obj.depart_city = city_obj.name
                }
            })
            dest_location_id = depart_item.destination_location_id
            $.each(location_obj_list, function(index, location_obj){
                if(dest_location_id == location_obj.id){
                    departure_obj.dest_location = location_obj.name
                }
            })
            $.each(stop_list, function(index, city_obj){
                if(destination_city_id == city_obj.id){
                    departure_obj.arrival_city= city_obj.name
                }
            })
            operator_id =depart_item.operator_id
            operator_img = ""
            $.each(operator_obj_list, function(index, operator_obj){
                if(operator_id == operator_obj.id){
                    departure_obj.operator_img = operator_obj.logo_url
                }
            })
            final_departure_list.push(departure_obj)
        })
        searchResults =  final_departure_list
        this.setState({
            searchResults: final_departure_list,
        })
    },
    search:function(search_url){
        this.setState({
            search_status: true
        })
        $.ajax({
            type:"GET",
            url:search_url,
            success:function(data){
                data = $.parseJSON(data)
                if (data.complete){
                    this.showResults(data)
                    this.setState({
                        search_status: false
                    })
                }
                else{
                    $.ajax({
                        type:"GET",
                        url:search_url,
                        success:function(data){
                            data = $.parseJSON(data)
                            this.showResults(data)
                            this.setState({
                                search_status: false
                            })
                        }.bind(this)
                    })
                }
            }.bind(this)
        })
    },
    render:function(){
        return(
            <div>
                <div className="banner_background">
                    <img src="/logo.png"></img>
                </div>
                <SearchBox search={this.search}/>
                {(this.state.search_status ? <div className="loading_container"><i className="fa fa-spinner fa-pulse fa-fw"></i><span>Loading...</span></div> : '')}
                <Results searchResults = {this.state.searchResults} />
            </div>
        )
    }
})

var SearchBox = React.createClass({
    createAjax:function(){
        var currency = React.findDOMNode(this.refs.currency_group).value;
        var search_url = "/initial_search?adult=1&child=0&senior=0&lang=en&currency="+currency
        this.props.search(search_url)
    },
    render:function(){
        return(
            <div>
                <div className="search_section">
                    <div className="input_container">
                        <input type="text" className="depature" value="NEW YORK" readOnly></input>
                        <input type="text" className="destination" value="MONTREAL" readOnly></input>
                        <input type="text" className="date" value="2017-07-29" readOnly></input>
                        <select className="currency_group" ref="currency_group">
                            <option value="CAD">CAD</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                    <button id="search_btn" className="search hvr-sweep-to-bottom" onClick={this.createAjax}><i className="fa fa-search"></i></button>
                </div>
            </div>
        )
    }
})

var Results = React.createClass({
    render:function(){
        var resultItems = this.props.searchResults.map(function(result){
            return <ResultItem departure_time={result.departure_time} arrival_time={result.arrival_time}
                        prices={result.price} link={result.link}
                        class={result.class} depart_location={result.depart_location}
                        depart_city={result.depart_city} dest_location={result.dest_location}
                        arrival_city={result.arrival_city}
                        operator_img = {result.operator_img}
                    />
        });
        return(
            <ul id="result_list" className="result_list">
                {resultItems}
            </ul>
        )
    }
})


var ResultItem = React.createClass({
    render: function(){
        return (
            <li className="result_item">
                <div className="result_conatiner">
                    <div className='bus_info'>
                        <div>
                            <p className='time'>{this.props.departure_time}<span className='location'>{this.props.depart_location}<span className='city'>( {this.props.depart_city} )</span></span></p>
                            <p className='time'>{this.props.arrival_time}<span className='location'>{this.props.dest_location}<span className='city'>( {this.props.arrival_city} )</span></span></p>
                            <p className='price'><span className="number">${this.props.prices}</span></p>
                            <p className='seat'>{this.props.class}</p>
                        </div>
                    </div>
                    <div className='logo_container'><div className='flex_container'><img className='logo' src={this.props.operator_img}></img></div></div>
                    <div className='booking_link'><a className='link' href={this.props.link}>BOOK NOW</a></div>
                </div>
            </li>
        )
    }
})

React.render(<App />, document.getElementById("index"))


