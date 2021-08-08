import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import scales from "../../scales/scales.exercise.json";
import tsp from "../../tsp/tsp.exercise.json";
import img from "../../scales/scales.gif";
import "./exerciseView.css";

const ExerciseView = () => {
  const exerciseData = [
    {
      key: scales.id,
      id: scales.id,
      imgLocation: img,
      title: scales.name,
      text: scales.description.join(" "),
    },
    {
      key: tsp.id,
      id: tsp.id,
      imgLocation: tsp.imgLocation,
      title: tsp.name,
      text: tsp.description.join(" "),
    },
  ];

  return (
    <CardDeck className="d-flex justify-content-center">
      {exerciseData.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          id={exercise.id}
          title={exercise.title}
          text={exercise.text}
          imgLocation={exercise.imgLocation}
        />
      ))}
    </CardDeck>
  );
};

const ExerciseCard = ({ imgLocation, title, text, id }) => {
  return (
    <Card className="exercise-card">
      <Card.Img
        className="exercise-card__image"
        variant="top"
        src={imgLocation}
      />
      <Card.Body>
        <Card.Title as="h5">{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Container className="d-flex justify-content-center">
          <Button
            variant="primary"
            className="btn-dark-blue"
            as={Link}
            to={`/exercises/${id}`}
          >
            Try it!
          </Button>
        </Container>
      </Card.Footer>
    </Card>
  );
};
ExerciseCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgLocation: PropTypes.string.isRequired,
};

export default ExerciseView;
