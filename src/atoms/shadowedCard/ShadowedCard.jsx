import Card from "react-bootstrap/Card";
import React from "react";
import PropTypes from "prop-types";
import "./shadowedCard.css";

const ShadowedCard = ({ children }) => {
  return <Card className="shadow-sm shadowed-card">{children}</Card>;
};
ShadowedCard.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};
ShadowedCard.defaultProps = {
  children: <div />,
};

export default ShadowedCard;
