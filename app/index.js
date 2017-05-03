import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render () {
    return (
      <h2>{'hello wsrld'}</h2>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))