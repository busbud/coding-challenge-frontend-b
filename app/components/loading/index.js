import React, { Component } from 'react'
import { loading } from './style.css'
import { Redirect } from 'react-router-dom'

class Loading extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: props.text,
      time: 0
    }
  }

  componentDidMount() {
    var stopper = this.props.text + '...'
    this.interval = window.setInterval(function () {

      // count to see that loader is not in a loop
      this.setState(function (prevState) {
        return { time: prevState.time + 1 }
      })

      if (this.state.text === stopper) {
        this.setState({ text: this.props.text })
      }else{
        this.setState(function (prevState) {
          return { text: prevState.text + '.' }
        })
      }
    }.bind(this), 300)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    // if the loader has been loading for longer than 10s
    // we should break the loop and redirect
    return (
      <div>
        { this.state.time < 30 ? (
            <p className={loading}>{this.state.text}</p>
          ) : (
            <Redirect to='/error/loading'/>
          )
        }
      </div>
    )
  }
}

export default Loading