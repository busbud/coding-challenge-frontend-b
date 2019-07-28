import PropTypes from "prop-types";

const Header = props => (
  <header className="wrapper">
    <div className="background">
      <img className="background-image" src="/static/background.jpg" />
    </div>
    <div className="banner">
      <img
        className="banner-image"
        src="/static/banner.png"
        alt="Osheaga Festival Musique Et Arts"
      />
    </div>
    <h1>Travel to Osheaga by Bus</h1>
    {props.children}
    <style jsx>{`
      .wrapper {
        color: white;
        padding-bottom: 64px;
        padding-top: 64px;
        position: relative;
      }
      .background {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
      }
      .background-image {
        height: inherit;
        object-fit: cover;
        width: 100%;
      }
      .banner {
        margin-left: auto;
        margin-right: auto;
        max-width: 400px;
      }
      .banner-image {
        height: auto;
        max-width: 100%;
      }
      h1 {
        color: white;
        font-size: 44px;
        margin-bottom: 0;
        margin-top: 32px;
        text-align: center;
      }
    `}</style>
  </header>
);

Header.propTypes = {
  children: PropTypes.node
};

export default Header;
