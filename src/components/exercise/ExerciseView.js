import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import scales from "./scales/scales.exercise.json";
import tsp from "./tsp/tsp.exercise.json";
import img from "./scales/scales.gif";

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
    <HoverableCard>
      <Card.Img variant="top" src={imgLocation} style={{ height: "300px" }} />
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
    </HoverableCard>
  );
};
ExerciseCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgLocation: PropTypes.string.isRequired,
};

const HoverableCard = ({ children }) => {
  const [cardStyle, setCardStyle] = useState({});
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const normalCardStyle = {
      minWidth: "30rem",
      maxWidth: "321px",
      transition: "0.3s",
      marginBottom: "1%",
    };

    const hoveredCardStyle = {
      minWidth: "30rem",
      maxWidth: "321px",
      boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
      transition: "0.3s",
      marginBottom: "1%",
    };
    if (hovered === true) {
      setCardStyle(hoveredCardStyle);
    } else setCardStyle(normalCardStyle);
  }, [hovered]);

  return (
    <Card
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{ ...cardStyle }}
      className=""
    >
      {children}
    </Card>
  );
};
HoverableCard.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExerciseView;
