import React from 'react';

class LoadingAnimation extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      visibleInDOM : true, 
      active: false,
      cover: false
    };
  }

  componentDidMount() {
    setTimeout(function() {

    },50);
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.active) {

      if(this.cleanDOMrequestTimer) {
        clearTimeout(this.cleanDOMrequestTimer);
      }

      this.setState({ 
        active: true, 
        visibleInDOM: true 
      });

    } else {

      this.setState({ 
        active: false 
      });

      this.cleanDOMrequestTimer = setTimeout(function() {
        this.setState({ 
          visibleInDOM: false 
        });
      }.bind(this), 1000)

    }
  }

  render() {
    var activeClass = this.state.active ? ' active' : '';

    if(this.state.visibleInDOM) {
      return (
        <div className={'loadingAnimation' + activeClass}>
          <div className="loadingAnimationSpinner" />
          <div className="loadingAnimationSpinner" />
        </div>
      )
    } else {
      return null;
    }
  }
}

export default LoadingAnimation;