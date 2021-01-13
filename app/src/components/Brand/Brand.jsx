import PropTypes from "prop-types";

const Brand = (props) => {
  return <img src={props.logo} alt={props.logoAltText} />;
};

Brand.propTypes = {
  logo: PropTypes.node.isRequired,
  logoAltText: PropTypes.string.isRequired,
};

export default Brand;
