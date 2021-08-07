import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import React from "react";
import ShadowedCard from "../../../atoms/shadowedCard/ShadowedCard";
import "./animationCard.css";

const ExerciseAnimationCard = ({ children }) => {
  return (
    <ShadowedCard>
      <Card.Header as="h5" className="dark-blue-text">
        Animation
      </Card.Header>
      <Card.Body>
        <Container className="animation-card__body">{children}</Container>
      </Card.Body>
    </ShadowedCard>
  );
};
ExerciseAnimationCard.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ExerciseAnimationCard;
