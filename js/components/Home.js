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
                <div className="header">
                    <div className="header_mainbar">
                        <LanguageSelector currentPath={this.props.location.pathname}/>
                        <h1 className="header_mainbar_title">Busbud front-end coding challenge</h1>
                    </div>
                    <div className="row align-middle align-center">
                        <div className="columns small-12 medium-5 header_igloo-logo"><img src="http://igloofest.ca/public/app/uploads/images/5661d13eecfee.png" alt="igloofest logo"/></div>
                        <div className="columns small-12 medium-5 header_busbud-logo"><img src="https://busbud-pubweb-assets.global.ssl.fastly.net/images/logos/fc7ed21.logo-post-60@2x.png" alt="busbud logo"/></div>
                    </div>
                </div>
                {this.getChildrenWithStore()}
            </div>
        )
    }
});

export default Home;