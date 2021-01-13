import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const CustomHelmet = (props) => {
  return (
    <Helmet>
      <html lang={props.lang} />
      <title>{props.helmetTitle}</title>
      <meta name="description" content={props.metaDescription} />
    </Helmet>
  );
};

CustomHelmet.defaultProps = {
  lang: "en",
  title: "Busbud",
};

CustomHelmet.propTypes = {
  htmlLang: PropTypes.oneOf(["en", "fr"]),
  helmetTitle: PropTypes.string,
  metaDescription: PropTypes.string.isRequired,
};

export default CustomHelmet;
