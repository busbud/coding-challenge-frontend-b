import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2019-08-02',
    };
  }

  render() {
    const { date } = this.state;
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Busbud Osheaga
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h1 className="title">
              Hello, World!
            </h1>
            <h2>
              {date}
            </h2>
          </div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
