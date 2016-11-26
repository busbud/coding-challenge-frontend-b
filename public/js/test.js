/**
 * @jsx React.DOM
 */
// var React = require('react');
// var ReactDOM = require('react-dom');

var App = React.createClass({
    callAjax:function () {
        console.log("lets search")
        $.ajax({
            url: "/search",
            success: function(data){
                data = $.parseJSON(data)
                console.log(data.complete)
                if (data.complete){
                    departure_list = data.departures
                    operator_obj_list = data.operators
                    $.each(departure_list, function(index, this_obj){
                        depature_time = this_obj.departure_time
                        depature_tag = "<p class='time'> Depature Time: "+depature_time+"</p>"
                        arrival_time = this_obj.arrival_time
                        arrival_tag =  "<p class='time'> Arrival  Time: "+arrival_time+"</p>"
                        prices = this_obj.prices.total
                        prices_tag = "<p class='price'>Price: "+prices/100.00+"</p>"
                        seat_class = this_obj.class
                        seat_tag = "<p class='seat'>Class: "+seat_class+"</p>"
                        left_col = "<div class='bus_info'>"+depature_tag+arrival_tag+prices_tag+seat_tag+"</div>"
                        link = this_obj.links.deeplink
                        link_tag = "<div><a class='link' href='"+link+"'>BOOK NOW</a></div>"
                        operator_id =this_obj.operator_id
                        operator_img = ""
                        $.each(operator_obj_list, function(index, operator_obj){
                            if(operator_id == operator_obj.id){
                                operator_img = operator_obj.logo_url
                            }
                        })
                        operator_logo_tag = "<div class='logo_container'><img class='logo' src="+operator_img+"></img></div>"
                        new_item = '<li class="result_item"><div class="result_conatiner">'+left_col+operator_logo_tag+link_tag+'</div></li>'
                        $("#result_list").append(new_item)
                    })
                }
                else{
                    console.log("reload the page")
                }
            }.bind(this),
            error: function(xhr, status, error){
                console.log(this.props.url, status, error.toString());
                this.setState({error: true});
            }.bind(this)
        });
    },
    render: function () {
        return(
            <section>
                <div className="banner_background">
                    <img src="/logo.png"></img>
                </div>
                <div>
                    <div>
                        <input className="depature" value="NEW YORK" readOnly></input>
                        <input className="destination" value="MONTREAL" readOnly></input>
                    </div>
                    <button id="search_btn" className="search" onClick={this.callAjax}> Search</button>
                </div>
                <div className="result_wrapper">
                    <ul id="result_list" className="result_list">
                    </ul>
                </div>
            </section>
        )
    }
});
React.render(
    <App />,
    document.getElementById('index')
);