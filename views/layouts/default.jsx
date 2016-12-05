var React = require('react');

class DefaultLayout extends React.Component {

  render() {
    return (
      <html>
        <head>
          <title>Osheaga festival</title>
      		<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />
      		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
      		<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
            <script src="//fb.me/react-0.14.3.min.js"></script>
            <script src="//fb.me/react-dom-0.14.3.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
      		<link rel="stylesheet" type="text/css" href="/stylesheets/style.css" />

        </head>
        <body>{this.props.children}</body>
      </html>
    );
  }
}

module.exports = DefaultLayout;