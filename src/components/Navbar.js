import classes from "../style/Navbar.module.scss";
import { FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
function Navbar({ nav, changeLan }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "fr");

  useEffect(() => {
    if (!localStorage.getItem("lang")) {
      return setLang("fr");
    }
    setLang(localStorage.getItem("lang") === "fr" ? "en" : "fr");
  }, []);

  const changeLang = () => {
    localStorage.setItem("lang", lang);
    setLang(lang === "fr" ? "en" : "fr");
    changeLan();
  };
  return (
    <div className={classes.navbar}>
      <div className={classes.home} onClick={() => nav("/")}>
        <FormattedMessage id="home" />
      </div>
      <div className={classes.logo}>
        <img
          src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
          alt="logo"
        />
      </div>
      <div className={classes.translate}>
        <span onClick={changeLang}>{lang}</span>
      </div>
    </div>
  );
}

export default Navbar;
