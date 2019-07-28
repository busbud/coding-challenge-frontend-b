import { i18n } from "../i18n";
import { colours, fonts } from "../theme";

const LanguageToggle = () => (
  <div>
    <button type="button" onClick={() => i18n.changeLanguage("en")}>
      EN
    </button>
    <button type="button" onClick={() => i18n.changeLanguage("fr")}>
      FR
    </button>
    <style jsx>{`
      div {
        margin-bottom: 32px;
        margin-left: auto;
        margin-right: auto;
        max-width: 960px;
        text-align: right;
      }
      button {
        background-color: ${colours.blueLight};
        border: none;
        color: ${colours.blue};
        cursor: pointer;
        font-family: ${fonts.slab};
        font-size: 1rem;
        margin-left: 8px;
        padding-bottom: 4px;
        padding-top: 4px;
        width: 40px;
      }
    `}</style>
  </div>
);

export default LanguageToggle;
