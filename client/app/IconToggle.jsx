import React from 'react';
import Icon from './Icon.jsx';

class IconToggle extends React.Component {

  constructor(props) {
    super(props);
    this.state = { initialized: false};
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.onClick(!this.state.on);
    this.setState({on : !this.state.on});
  }
  
  componentDidMount() {
    this.setState({
      on : this.props.initialState,
      initialized: true
    })
  }
  
  render() {
    if(this.state.initialized) {
      return (
        <button type="button" className="iconToggle" onClick={this.handleClick}>
          <Icon src={ (this.state.on ? this.props.onIcon : this.props.offIcon) } />
        </button>
      )
    } else {
      return <button className="iconToggle" />
    }
  }
}

export default IconToggle;