import React      from 'react';
import IconToggle from './IconToggle.jsx';

class SplashBackground extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      video: this.props.video,
      paused: !this.props.video.autoPlay,
      canplay: false,
      disabled: this.props.disabled
    };
    this.toggleSound    = this.toggleSound.bind(this);
    this.togglePlayback = this.togglePlayback.bind(this);
    this.onCanPlay = this.onCanPlay.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      video: nextProps.video,
      disabled : nextProps.disabled
    })

  }

  onCanPlay() {

    this.setState({
      canplay: true,
      paused: !this.state.video.autoPlay
    })

    if(this.state.video.autoPlay) {
      this.togglePlayback(true);
    }

  }

  toggleSound(val) {
    this._videoElement.muted = val;
  }
  
  togglePlayback(val) {

    this.setState({
      paused: !val
    })

    var thisvid = this._videoElement;
    var thisVidPlay = thisvid.play;

    this._videoElement[val ? 'play' : 'pause']();
    
  }
  
  render() {

    if(this.state.disabled || typeof this.state.video === 'undefined') {

      return null;

    } else {

      return(
        <div className={'splashBackground' + (this.state.canplay ? ' canplay' : '')} >
          <video 
            onCanPlay = {this.onCanPlay}
            onError   = {this.onError}
            autoPlay  = {!this.state.paused}
            ref       = {(c) => this._videoElement = c}
            className = {this.state.paused ? '' : 'show'}
            muted     = {this.state.video.muted}
            loop      = {this.state.video.loop}>
            <source 
              src ={this.state.video.src} 
              type='video/mp4' />
          </video>
            <div className='controls'>
              <IconToggle onClick={this.toggleSound}    initialState={this.state.video.muted}    onIcon='/images/icons/muted.svg#Layer_1' offIcon='/images/icons/unmuted.svg#Layer_1'/>
              <IconToggle onClick={this.togglePlayback} initialState={!this.state.paused} onIcon='/images/icons/pause.svg#Layer_1' offIcon='/images/icons/play.svg#Layer_1'/>
            </div>
        </div>
      )

    }
  }
}

export default SplashBackground;