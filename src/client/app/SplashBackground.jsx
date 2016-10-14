import React from 'react';
import $ from 'jquery';
import IconToggle from './IconToggle.jsx';

class SplashBackground extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.toggleSound    = this.toggleSound.bind(this);
		this.togglePlayback = this.togglePlayback.bind(this);
		this.checkIfMobile  = this.checkIfMobile.bind(this);
	}
    
	componentDidMount() {
		$(window).resize(this.checkIfMobile);
		this.checkIfMobile();
	}
	
	checkIfMobile() {
		this.setState({isMobile: (window.innerWidth < 767)});
	}
  
	toggleSound() {
		this._video.muted = !this._video.muted;
	}
	
	togglePlayback() {
		this._video[this._video.paused ? 'play' : 'pause']();
		this._video.style.display = this._video.paused ? 'none' : '';
	}
  
	render() {
		return (
			<div>
			{this.state.isMobile ? false :
				<div className="splashBackground">
				{typeof this.props.video === 'undefined' ? false :
					<video 
						autoPlay  = {this.props.video.autoPlay}
						muted     = {this.props.video.muted}
						loop      = {this.props.video.loop}
						style     = {{display: (this.props.video.autoPlay ? '' : 'none')}}
						ref       = {(c) => this._video = c}
						src       = {this.props.video.src}
					/>
				}
				{typeof this.props.video.muted === 'undefined' ? false :
					<div className="controls">
						<IconToggle onClick={this.toggleSound}    initialState={this.props.video.muted} onIcon="/images/icons/mute.svg#Layer_1"  offIcon="/images/icons/unmute.svg#Layer_1"/>
						<IconToggle onClick={this.togglePlayback} initialState={this.props.video.autoPlay} onIcon="/images/icons/pause.svg#Layer_1" offIcon="/images/icons/play.svg#Layer_1"/>
					</div>
				}
				</div>
			}
			</div>
		);
	}

}

export default SplashBackground;