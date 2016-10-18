import React from 'react';
import $ from 'jquery';
import IconToggle from './IconToggle.jsx';

class SplashBackground extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			video: this.props.video
		};
		this.toggleSound    = this.toggleSound.bind(this);
		this.togglePlayback = this.togglePlayback.bind(this);
		this.checkIfMobile  = this.checkIfMobile.bind(this);
	}

	componentDidMount() {

		$(window).resize(this.checkIfMobile);

		this.checkIfMobile();
		this.setState({
			video:this.props.video,
			paused: !this.props.video.autoPlay
		})
	}
	
	checkIfMobile() {
		this.setState({isMobile: (window.innerWidth <= 767)});
	}
  
	toggleSound(val) {
		this._videoElement.muted = val;
	}
	
	togglePlayback(val) {
		this.setState({
			paused: !val
		})
		this._videoElement[val ? 'play' : 'pause']();
	}
  
	render() {

		if(this.state.isMobile) {

			return <div />;

		} else if(typeof this.state.video === 'undefined') {

			return <div className="splashBackground" />;

		} else {

			return(
				<div className="splashBackground" >
					<video  
						ref       = {(c) => this._videoElement = c}
						className = {this.state.paused ? 'paused' : ''}
						autoPlay  = {this.state.video.autoPlay}
						muted     = {this.state.video.muted}
						loop      = {this.state.video.loop}
						src       = {this.state.video.src}
					/>
					<div />
					<div className="controls">
						<IconToggle onClick={this.toggleSound}    initialState={this.state.video.muted} onIcon="/images/icons/muted.svg#Layer_1"  offIcon="/images/icons/unmuted.svg#Layer_1"/>
						<IconToggle onClick={this.togglePlayback} initialState={this.state.video.autoPlay} onIcon="/images/icons/pause.svg#Layer_1" offIcon="/images/icons/play.svg#Layer_1"/>
					</div>
				</div>
			)

		}
	}
}

export default SplashBackground;