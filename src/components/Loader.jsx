import React from 'react';
import createReactClass from 'create-react-class';
import { CircularProgress } from 'material-ui';


const Loader = createReactClass({
  getInitialState() {
		return {
      height: (window.innerHeight/2)-90
		};
  },
  resize: function() {
      this.setState({height: (window.innerHeight/2)-90});
  },
  componentWillMount: function() {
      this.resize();
  },
  componentDidMount: function() {
      window.addEventListener('resize', this.resize);
  },
  componentWillUnmount: function() {
      window.removeEventListener('resize', this.resize);
  },
  render(){
    return (
      <div className='loader-overlay'>
        <CircularProgress style={{marginTop:this.state.height}} size={60} thickness={7} />
      </div>
    );
  }
});

export default Loader;
