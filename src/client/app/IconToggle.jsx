import React from 'react';
import Icon from './Icon.jsx';

class IconToggle extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}
  
	handleClick() {
		this.setState({on : !this.state.on});
		this.props.onClick(this.state.on);
	}
  
	componentDidMount() {
		this.state.on = this.props.initialState;
	}
	
	render() {
		return (
			<button type="button" className="iconToggle" onClick={this.handleClick}>
				<Icon src={ (this.state.on ? this.props.onIcon : this.props.offIcon) } />
			</button>
		);
	}

}

export default IconToggle;