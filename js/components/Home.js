import React from 'react';
import LanguageSelector from './LanguageSelector';

var Home = React.createClass({
    componentDidMount(){
        const {store} = this.props;
        const lang = this.props.params.lang;

        store.dispatch({
            type:'CHANGE_LANGUAGE',
            language: lang
        })
    },
    componentWillReceiveProps(newProps){
        const {store} = newProps;
        const lang = newProps.params.lang;

        store.dispatch({
            type:'CHANGE_LANGUAGE',
            language: lang
        })
    },
    getChildrenWithStore(){
        var comp = this;
        return React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { store: comp.props.store });
        });
    },
    render() {
        const store = this.props.store;
        return (
            <div className="wrapper">
                <div className="header row align-middle align-justify">
                    <LanguageSelector store={store} currentPath={this.props.location.pathname}/>
                    <div className="columns small-10 medium-3 header_busbud-logo"><a href="https://www.busbud.com/en" target="_blank"><img src="https://busbud-pubweb-assets.global.ssl.fastly.net/images/logos/fc7ed21.logo-post-60@2x.png" alt="busbud logo"/></a></div>
                    <h1 className="columns small-12 header_title">Front-end coding challenge</h1>
                </div>
                {this.getChildrenWithStore()}
            </div>
        )
    }
});

export default Home;