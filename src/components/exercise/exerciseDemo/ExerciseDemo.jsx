import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { IterationsOptions } from "../../../atoms/IterationsSlider";
import { DataOptions } from "../ExerciseEditor";
import "./exerciseDemo.css";

const RandomHillClimbing = ({ eventKey, callback, initialData }) => {
  const [iterations, setIterations] = useState("100");
  const [data, setData] = useState(initialData);

  return (
    <Card>
      <AlgorithmHeader
        eventKey={eventKey}
        name="Random Mutation Hill Climbing"
      />
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>
          <IterationsOptions
            iterations={iterations}
            setIterations={setIterations}
          />
          <Data data={data} setData={setData} />
          <div className="float-right algorithm-card__body__run-button-wrapper">
            <Button
              type="button"
              className="btn-dark-blue"
              variant="primary"
              onClick={() =>
                callback("rmhc", {
                  iterations,
                  data: JSON.parse(data).data,
                })
              }
            >
              Run Algorithm
            </Button>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
RandomHillClimbing.propTypes = {
  eventKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  initialData: PropTypes.string.isRequired,
};

const RandomRestartHillClimbing = ({ eventKey, callback, initialData }) => {
  const [iterations, setIterations] = useState("100");
  const [restarts, setRestarts] = useState("10");
  const [data, setData] = useState(initialData);

  return (
    <Card>
      <AlgorithmHeader
        eventKey={eventKey}
        name="Random Restart Hill Climbing"
      />
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>
          <IterationsOptions
            iterations={iterations}
            setIterations={setIterations}
          />
          <hr />
          <CustomOption
            value={restarts}
            title="Restarts"
            min={1}
            max={100}
            updateFunction={setRestarts}
            step=""
          />
          <Data data={data} setData={setData} />
          <div className="float-right algorithm-card__body__run-button-wrapper">
            <Button
              type="button"
              className="btn-dark-blue"
              variant="primary"
              onClick={() =>
                callback("rrhc", {
                  iterations,
                  restarts,
                  data: JSON.parse(data).data,
                })
              }
            >
              Run Algorithm
            </Button>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
RandomRestartHillClimbing.propTypes = {
  eventKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  initialData: PropTypes.string.isRequired,
};

const StochasticHillClimbing = ({ eventKey, callback, initialData }) => {
  const [iterations, setIterations] = useState("100");
  const [delta, setDelta] = useState("25");
  const [data, setData] = useState(initialData);

  return (
    <Card>
      <AlgorithmHeader eventKey={eventKey} name="Stochastic Hill Climbing" />
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>
          <IterationsOptions
            iterations={iterations}
            setIterations={setIterations}
          />
          <hr />
          <CustomOption
            value={delta}
            title="T or Delta"
            min={0}
            max={100}
            updateFunction={setDelta}
            step=""
          />
          <Data data={data} setData={setData} />
          <div className="float-right algorithm-card__body__run-button-wrapper">
            <Button
              type="button"
              className="btn-dark-blue"
              variant="primary"
              onClick={() =>
                callback("shc", {
                  iterations,
                  delta,
                  data: JSON.parse(data).data,
                })
              }
            >
              Run Algorithm
            </Button>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
StochasticHillClimbing.propTypes = {
  eventKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  initialData: PropTypes.string.isRequired,
};

const SimulatedAnnealing = ({ eventKey, callback, initialData }) => {
  const [iterations, setIterations] = useState("100");
  const [data, setData] = useState(initialData);
  const [temperature, setTemperature] = useState("50");
  const [coolingRate, setCoolingRate] = useState("0.01");

  return (
    <Card>
      <AlgorithmHeader eventKey={eventKey} name="Simulated Annealing" />
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>
          <IterationsOptions
            iterations={iterations}
            setIterations={setIterations}
          />
          <hr />
          <Row>
            <Col>
              <TemperatureOption
                temperature={temperature}
                setTemperature={setTemperature}
              />
            </Col>
            <Col>
              <CoolingRateOption
                coolingRate={coolingRate}
                setCoolingRate={setCoolingRate}
              />
            </Col>
          </Row>
          <Data data={data} setData={setData} />
          <div className="float-right algorithm-card__body__run-button-wrapper">
            <Button
              type="button"
              className="btn-dark-blue"
              variant="primary"
              onClick={() =>
                callback("sa", {
                  iterations,
                  temperature,
                  coolingRate,
                  data: JSON.parse(data).data,
                })
              }
            >
              Run Algorithm
            </Button>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
SimulatedAnnealing.propTypes = {
  eventKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  initialData: PropTypes.string.isRequired,
};

const Data = ({ data, setData }) => {
  return (
    <div>
      <h5>Data:</h5>
      <div className="data-editor-container">
        <DataOptions data={data} setData={setData} height="300" />
      </div>
    </div>
  );
};
Data.propTypes = {
  data: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
};

const Slider = ({ min, max, value, setValue, step = ".00001" }) => {
  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    setValue(innerValue);
  }, [innerValue, setValue]);

  return (
    <div className="line controls">
      <input
        className="progress slider__input--width-medium"
        type="range"
        step={step}
        min={min}
        max={max}
        value={innerValue}
        onChange={(event) => {
          setInnerValue(event.target.value);
        }}
      />
    </div>
  );
};
Slider.propTypes = {
  value: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  step: PropTypes.string,
};
Slider.defaultProps = {
  step: ".00001",
};

const TemperatureOption = ({ temperature, setTemperature }) => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h5>Temperature: {temperature}</h5>
      </div>
      <Slider
        min={0}
        max={100000}
        value={temperature}
        setValue={setTemperature}
        step=".0"
      />
    </div>
  );
};
TemperatureOption.propTypes = {
  temperature: PropTypes.string.isRequired,
  setTemperature: PropTypes.func.isRequired,
};

const CustomOption = ({ title, value, min, max, updateFunction, step }) => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h5>
          {title}: {value}
        </h5>
      </div>
      <Slider
        min={min}
        max={max}
        value={value}
        setValue={updateFunction}
        step={step}
      />
    </div>
  );
};
CustomOption.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  updateFunction: PropTypes.func.isRequired,
  step: PropTypes.string.isRequired,
};

const CoolingRateOption = ({ coolingRate, setCoolingRate }) => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h5>Cooling Rate: {coolingRate}</h5>
      </div>
      <Slider min={0} max={1} value={coolingRate} setValue={setCoolingRate} />
    </div>
  );
};
CoolingRateOption.propTypes = {
  coolingRate: PropTypes.string.isRequired,
  setCoolingRate: PropTypes.func.isRequired,
};

const AlgorithmHeader = ({ eventKey, name }) => {
  return (
    <Card.Header>
      <Accordion.Toggle
        as={Nav.Link}
        eventKey={eventKey}
        className="d-flex justify-content-center"
      >
        {name}
      </Accordion.Toggle>
    </Card.Header>
  );
};
AlgorithmHeader.propTypes = {
  eventKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const ExerciseDemo = ({ demoCallback, data }) => {
  const algorithms = [
    ["rmhc", RandomHillClimbing],
    ["rrhc", RandomRestartHillClimbing],
    ["shc", StochasticHillClimbing],
    ["sa", SimulatedAnnealing],
  ];

  return (
    <Accordion>
      {algorithms.map(([key, Algorithm], i) => {
        return (
          <Algorithm
            key={key}
            initialData={data}
            eventKey={i.toString(10)}
            callback={demoCallback}
          />
        );
      })}
    </Accordion>
  );
};
ExerciseDemo.propTypes = {
  demoCallback: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
};

export default ExerciseDemo;
