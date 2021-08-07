import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import ShadowedCard from "../../atoms/shadowedCard/ShadowedCard";

const ExerciseProblem = ({ name, children }) => {
  return (
    <ShadowedCard>
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>{children}</Card.Body>
    </ShadowedCard>
  );
};
ExerciseProblem.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ExerciseProblem;
