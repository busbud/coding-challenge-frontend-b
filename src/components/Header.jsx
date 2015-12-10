var React = require('react');
var languages = require("../languages.js");
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;


var HeaderLayout = React.createClass({
            mixins: [Router.State],
            getInitialState: function() {
                var language = this.getParams().language;
                if (!language) {
                    language = "en";
                }
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
                                    <div className="col-lg-10 col-lg-push-1 col-md-8 col-sm-10 col-sm-push-1 col-md-push-2 col-lg-push-2">
                                        <div className="navbar-header">
                                            <button type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false" className="navbar-toggle collapsed">
                                                <span className="sr-only">Toggle navigation</span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                            </button>
                                            <div className="logo">
                                                <a accessKey="1" href={ "/" + this.state.currentLang}><span>Logo</span></a>
                                            </div>
                                        </div>
                                        <div id="navbar-collapse" className="collapse navbar-collapse">
                                            <ul className="nav navbar-nav navbar-right">
                                                <li className="dropdown">
                                                    <a href="#" id="languageMenu" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle">
                                                        {currentLanguage}
                                                        <span className="caret"></span>
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        {languageArray}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        
                            <RouteHandler />
                        </div>
                    );
    }
});

module.exports = HeaderLayout;