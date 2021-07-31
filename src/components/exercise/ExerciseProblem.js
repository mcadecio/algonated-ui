import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import ShadowedCard from "../../atoms/ShadowedCard";

export default function ExerciseProblem({ name, description: Description }) {
  return (
    <ShadowedCard>
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        <Description />
      </Card.Body>
    </ShadowedCard>
  );
}
ExerciseProblem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.element.isRequired,
};
