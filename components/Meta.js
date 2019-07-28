import PropTypes from "prop-types";
import Head from "next/head";

import { withTranslation } from "../i18n";

const Meta = props => (
  <Head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
      key="viewport"
    />
    <meta charSet="utf-8" key="charset" />
    <link
      href="https://fonts.googleapis.com/css?family=Changa+One|Poppins&display=swap"
      rel="stylesheet"
    />
    <title>{props.t("title")}</title>
  </Head>
);

Meta.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation("common")(Meta);
