import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className='footer-container'>
      {t("Designed by")}{" "}
      <a className='author' href={"https://scramblelock.github.io"}>
        Marc Sakalauskas
      </a>{" "}
      © 2019
    </div>
  );
};

export default Footer;
