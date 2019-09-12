import React from "react";
import "./LanguageSelect.css";

interface LanguageSelectProps {
  updateLanguage: (language: string) => void;
  currentLanguage: string;
}

export default (props: LanguageSelectProps) => {
  return (
    <div className="language-select-container">
      <div
        className={`language-select ${
          props.currentLanguage === "fr" ? "language-select--selected" : ""
        }`}
        onClick={() => props.updateLanguage("fr")}
      >
        FR
      </div>
      <div
        className={`language-select ${
          props.currentLanguage === "en" ? "language-select--selected" : ""
        }`}
        onClick={() => props.updateLanguage("en")}
      >
        EN
      </div>
    </div>
  );
};
