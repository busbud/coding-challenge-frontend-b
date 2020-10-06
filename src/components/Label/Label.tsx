import React from "react";
import { useTranslation } from "react-i18next";

import "./Label.scss";

interface ILabelProps {
  translationKey: string;
}

const Label: React.FC<ILabelProps> = ({ translationKey }) => {
  const { t } = useTranslation();

  return <label>{t(translationKey)}</label>;
};

export default Label;
