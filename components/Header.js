import PropTypes from "prop-types";

import { i18n, withTranslation } from "../i18n";
import { colours, fonts } from "../theme";

const Header = props => (
  <header>
    <div className="locale-buttons-wrapper">
      <button
        className="locale-button"
        type="button"
        onClick={() => i18n.changeLanguage("en")}
      >
        en
      </button>
      <button
        className="locale-button"
        type="button"
        onClick={() => i18n.changeLanguage("fr")}
      >
        fr
      </button>
    </div>
    <div className="background">
      <img className="background-image" src="/static/img/background.jpg" />
    </div>
    <div className="banner">
      <img
        className="banner-image"
        src="/static/img/banner.png"
        alt="Osheaga Festival Musique Et Arts"
      />
    </div>
    <h1>{props.t("heading")}</h1>
    {props.children}
    <style jsx>{`
      header {
        color: white;
        padding-bottom: 64px;
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 24px;
        position: relative;
      }
      .locale-buttons-wrapper {
        margin-bottom: 32px;
        margin-left: auto;
        margin-right: auto;
        max-width: 960px;
        text-align: right;
      }
      .locale-button {
        background-color: ${colours.blueLight};
        color: ${colours.blue};
        cursor: pointer;
        font-family: ${fonts.slab};
        font-size: 1rem;
        margin-left: 8px;
        width: 48px;
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
        font-size: 3rem;
        line-height: 1em;
        margin-bottom: 0;
        margin-top: 32px;
        text-align: center;
        text-shadow: 1px 1px 4px ${colours.blue};
      }
    `}</style>
  </header>
);

Header.propTypes = {
  children: PropTypes.node,
  t: PropTypes.func.isRequired
};

export default withTranslation("common")(Header);
