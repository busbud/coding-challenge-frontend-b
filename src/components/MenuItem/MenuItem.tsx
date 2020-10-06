import React from "react";
import { useTranslation } from "react-i18next";

import { Lang } from "../../models/Lang";

import "./MenuItem.scss";
import { Button } from "react-bootstrap";

interface IMenuItemProps {
  lang: Lang;
  changeLang: ChangeLang;
}

type ChangeLang = (lang: Lang) => void;

const MenuItem: React.FC<IMenuItemProps> = ({ lang, changeLang}) => {
  const { t, i18n } = useTranslation();

  return (
    <Button
      className={lang.isLangActive(i18n.language) ? "active" : ""}
      variant="link"
      onClick={() => {
        changeLang(lang);
      }}
    >
      {t(lang.keyTranslation)}
    </Button>
  );
};

export default MenuItem;
