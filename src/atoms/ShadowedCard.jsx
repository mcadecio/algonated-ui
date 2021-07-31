import Card from "react-bootstrap/Card";
import React from "react";
import PropTypes from "prop-types";

const ShadowedCard = ({ children }) => {
  return (
    <Card className="shadow-sm" style={{ marginBottom: "1%" }}>
      {children}
    </Card>
  );
};
ShadowedCard.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
};
ShadowedCard.defaultProps = {
  children: <div />,
};

export default ShadowedCard;
