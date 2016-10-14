import React      from 'react';
import moment     from 'moment';
import IconToggle from './IconToggle.jsx';

class CountDownBanner extends React.Component {

	constructor(props) {
		super(props);
		this.state          = { timeLeftString : "" };
		this.config         = { strings: { DAYS : 'Days', HOURS: 'Hours', MINUTES: 'Minutes', SECONDS: 'Seconds' }}
		this.updateTimeLeft = this.updateTimeLeft.bind(this);
	}
	
	updateTimeLeft() {
		
		if(typeof this.props.endTime !== 'undefined') {
			
			let d1 = new Date(this.props.endTime),
				d2 = new Date(),
				t  = Math.abs(d2.getTime() - d1.getTime()),
				r = [], 
				s = this.props.config.strings;
			
			t /= 1000; r.push((t % 60).toFixed(0) + s.SECONDS);
			t /= 60;   r.push((t % 60).toFixed(0) + s.MINUTES);
			t /= 60;   r.push((t % 24).toFixed(0) + s.HOURS);
			t /= 24;   r.push(t.toFixed(0) + s.DAYS);

			this.setState({timeLeftString : r.reverse().join(' ')});
			
		}
		
		this.interval = setTimeout(this.updateTimeLeft, typeof this.props.endTime !== 'undefined' ? 1000 : 0);
		
	}
  
	componentDidMount() {
		this.interval = setTimeout(this.updateTimeLeft, 0);
	}
  
	render() {
		return (
			<div className="countDownBanner">
				{this.state.timeLeftString}
			</div>
		)
	}

}

export default CountDownBanner;