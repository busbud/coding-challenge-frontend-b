import React from "react";
import { useTranslation } from "react-i18next";

import "./Presentation.scss";
import { Row, Col } from "react-bootstrap";

const Presentation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Row className="presentation">
      <Col xs={12}>
        <h4>{t("WEBSITE_PRESENTATION")}</h4>
      </Col>
    </Row>
  );
};

export default Presentation;
