var React = require('react');
var languages = require("../languages.js");
var Router = require('react-router');
var RouteHandler = require('react-router').RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
    

var HeaderLayout = React.createClass({
     mixins: [Router.State],
    getInitialState: function() {
        var language =  this.getParams().language
                if  (!language){
                    language = "en"
                }
        // console.log(this.props.params.language)
        // console.log(this.props.currentLang)
        return {
            currentLang: language
        };
    },
    render: function() {
        var languageArray = [];
        var currentLanguage = languages[this.state.currentLang].name;
        for (var lang in languages) {
            languageArray.push(
                <li key={languages[lang].abbr}><a href={"/" + languages[lang].abbr}>{languages[lang].name}</a></li>
            );
        }
        
        return (
             <div>
            <nav className="navbar navbar-default header">
                <div className="row container-fluid">
                    <div className="navbar-header">
                        <button type="button" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false" className="navbar-toggle collapsed"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                        <div className="main-column">
                            <div className="logo"><a accessKey="1" href="/en/"><span>Logo</span></a></div>
                        </div>
                    </div>
                    <div id="navbar-collapse-1" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown"><a href="#" id="languageMenu" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle">{currentLanguage}<span className="caret"></span></a>
                                <ul className="dropdown-menu">
 
                                    {languageArray}
            
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        
        <RouteHandler />
        </div>
        );
    }
});

module.exports = HeaderLayout;