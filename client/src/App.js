import React, { Component } from 'react';
import { Card } from 'antd';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { response: '' };
  }

  componentDidMount() {
    this.fetchData()
      .then(res => this.setState({ response: res.msg }))
      .catch(err => console.log(err));
  }

  fetchData = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Card
          title="Departure"
          extra={<a href="#">Book now</a>}
          style={{ width: 300 }}
        >
          <p>{this.state.response}</p>
        </Card>
      </div>
    );
  }
}

export default App;
