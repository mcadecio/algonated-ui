import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import Nav from "react-bootstrap/Nav";
import ShadowedCard from "../../atoms/shadowedCard/ShadowedCard";

const ExerciseInfo = ({ consoleOutput, alert, summary }) => {
  const [selected, setSelected] = useState("#console");
  const selectedComponent = () => {
    switch (selected) {
      case "#summary":
        return <SummaryTab summary={summary} />;
      case "#console":
      default:
        return <ConsoleTab consoleOutput={consoleOutput} />;
    }
  };

  return (
    <ShadowedCard>
      <ConsoleTabs changeTab={(selectedTab) => setSelected(selectedTab)} />
      <Card.Body>
        {alert}
        {selectedComponent()}
      </Card.Body>
    </ShadowedCard>
  );
};
ExerciseInfo.propTypes = {
  consoleOutput: PropTypes.string.isRequired,
  alert: PropTypes.elementType.isRequired,
  summary: PropTypes.shape({
    fitness: PropTypes.number.isRequired,
    timeRun: PropTypes.number.isRequired,
    iterations: PropTypes.number.isRequired,
    efficacy: PropTypes.number.isRequired,
  }).isRequired,
};

const ConsoleTab = ({ consoleOutput }) => {
  return <Card.Text as="pre">{consoleOutput}</Card.Text>;
};
ConsoleTab.propTypes = {
  consoleOutput: PropTypes.string.isRequired,
};

const ConsoleTabs = ({ changeTab }) => {
  return (
    <Card.Header as="h5">
      <Nav
        onSelect={(selectedKey) => changeTab(selectedKey)}
        fill
        variant="tabs"
        defaultActiveKey="#console"
      >
        <Nav.Item>
          <Nav.Link href="#console">Console</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#summary">Summary</Nav.Link>
        </Nav.Item>
      </Nav>
    </Card.Header>
  );
};
ConsoleTabs.propTypes = {
  changeTab: PropTypes.func.isRequired,
};

const SummaryTab = ({ summary }) => (
  <ListGroup variant="flush">
    <ListGroup.Item>Fitness: {summary.fitness}</ListGroup.Item>
    <ListGroup.Item>
      Time Run: {summary.timeRun}ms | {summary.timeRun / 1000}s
    </ListGroup.Item>
    <ListGroup.Item>Iterations: {summary.iterations}</ListGroup.Item>
    <ListGroup.Item>Efficacy: {summary.efficacy}</ListGroup.Item>
  </ListGroup>
);
SummaryTab.propTypes = {
  summary: PropTypes.shape({
    fitness: PropTypes.number.isRequired,
    timeRun: PropTypes.number.isRequired,
    iterations: PropTypes.number.isRequired,
    efficacy: PropTypes.number.isRequired,
  }).isRequired,
};

export default ExerciseInfo;
