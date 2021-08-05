import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Nav from "react-bootstrap/Nav";
import PropTypes from "prop-types";
import DangerDismissibleAlert from "../DangerDismissibleAlert";
import { DataOptions, MonacoExerciseEditor } from "./ExerciseEditor";
import ExerciseProblem from "./ExerciseProblem";
import "../anime.css";
import ExerciseDemo from "./demo/ExerciseDemo";
import ShadowedCard from "../../atoms/ShadowedCard";
import { IterationsOptions } from "../../atoms/IterationsSlider";

function ExercisePage({ problem }) {
  return (
    <div style={{ marginLeft: "2%", marginRight: "2%" }}>
      <ExerciseProblem
        name={problem.name}
        description={problem.customDescription}
      />
      <br />
      <TheWholePage exercise={problem.exercise} animation={problem.animation} />
    </div>
  );
}
ExercisePage.propTypes = {
  problem: PropTypes.shape({
    animation: PropTypes.elementType.isRequired,
    customDescription: PropTypes.elementType,
    exercise: PropTypes.shape({
      className: PropTypes.string.isRequired,
      package: PropTypes.string.isRequired,
      defaultStarterCode: PropTypes.string.isRequired,
      importsAllowed: PropTypes.arrayOf(PropTypes.string).isRequired,
      illegalMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
      data: PropTypes.arrayOf(PropTypes.any).isRequired,
      code: PropTypes.string.isRequired,
      problem: PropTypes.string.isRequired,
      endpoint: PropTypes.string.isRequired,
      iterations: PropTypes.number.isRequired,
    }),
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const TheWholePage = ({ exercise, animation }) => {
  const alert = DangerDismissibleAlert({
    innerText: "It looks like something went wrong, check the output !",
  });
  const [code, setCode] = useState(exercise.defaultStarterCode);
  const [isLoading, setLoading] = useState(false);
  const [iterations, setIterations] = useState(exercise.iterations.toString());
  const [exerciseData, setExerciseData] = useState(
    JSON.stringify({ data: exercise.data }, null, 2)
  );
  const [
    { consoleOutput, result, data, summary, solutions },
    setConsoleOutput,
  ] = useState({
    isSuccess: false,
    consoleOutput: "There's nothing here yet",
    result: [],
    solutions: [],
    data: exercise.data,
    summary: {
      fitness: 0,
      timeRun: 0,
      iterations: 0,
      efficacy: 0,
    },
  });

  const fetchRequest = (endpoint, request) => {
    const url = `${process.env.REACT_APP_FYP_SERVER_DOMAIN}${endpoint}`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((requestResult) => {
        setConsoleOutput(requestResult);
        alert.setShow(!requestResult.isSuccess);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const runDemo = (algorithm, extraFields) => {
    setLoading(true);
    const request = {
      problem: exercise.problem,
      algorithm,
      data: JSON.parse(exerciseData).data,
      ...extraFields,
    };
    fetchRequest(`/exercise/demo/${exercise.problem}`, request);
  };

  const sendCodeToServer = (value) => {
    setLoading(true);
    const request = {
      ...exercise,
      code: value,
      data: JSON.parse(exerciseData).data,
      iterations: Number.parseInt(iterations, 10),
    };

    fetchRequest(exercise.endpoint, request);
  };

  return (
    <>
      <Row xs={1} sm={1} md={1} lg={1} xl={2}>
        <Col>
          <ExerciseCodingArea
            code={code}
            setCode={setCode}
            iterations={iterations}
            setIterations={setIterations}
            data={exerciseData}
            setData={setExerciseData}
            demoCallback={runDemo}
          />
          <SubmitCodeButton
            isLoading={isLoading}
            callback={() => sendCodeToServer(code)}
          />
        </Col>
        <Col>
          <InformationArea
            alert={alert.alert}
            consoleOutput={consoleOutput}
            summary={summary}
          />
          <br />
          <AnimationTab
            solutions={solutions}
            solution={result}
            weights={data}
            animation={animation}
          />
        </Col>
      </Row>
      <br />
    </>
  );
};
TheWholePage.propTypes = {
  animation: PropTypes.elementType.isRequired,
  exercise: PropTypes.shape({
    className: PropTypes.string.isRequired,
    package: PropTypes.string.isRequired,
    defaultStarterCode: PropTypes.string.isRequired,
    importsAllowed: PropTypes.arrayOf(PropTypes.string).isRequired,
    illegalMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    code: PropTypes.string.isRequired,
    problem: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    iterations: PropTypes.number.isRequired,
  }).isRequired,
};

const ExerciseCodingArea = ({
  code,
  setCode,
  iterations,
  setIterations,
  data,
  setData,
  demoCallback,
}) => {
  const [constantData] = useState(data);
  const [selected, setSelected] = useState("#editor");
  const tabs = [
    {
      href: "#editor",
      title: "Editor",
    },
    {
      href: "#demo",
      title: "Demo",
    },
  ];

  const selectTab = (selection) => {
    if (selection === "#demo") {
      return <ExerciseDemo demoCallback={demoCallback} data={constantData} />;
    }
    if (selection === "#editor") {
      return (
        <EditorWithTabs
          code={code}
          setCode={setCode}
          data={data}
          setData={setData}
          iterations={iterations}
          setIterations={setIterations}
        />
      );
    }
    return <div />;
  };

  return (
    <ShadowedCard>
      <HeaderTabs changeTab={setSelected} tabNames={tabs} />
      {selectTab(selected)}
    </ShadowedCard>
  );
};
ExerciseCodingArea.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  setData: PropTypes.func.isRequired,
  iterations: PropTypes.number.isRequired,
  setIterations: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  demoCallback: PropTypes.func.isRequired,
};

const HeaderTabs = ({ changeTab, tabNames }) => {
  return (
    <Card.Header as="h5">
      <TabNavigation changeTab={changeTab} tabNames={tabNames} />
    </Card.Header>
  );
};
HeaderTabs.propTypes = {
  changeTab: PropTypes.func.isRequired,
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const FooterTabs = ({ changeTab, tabNames }) => {
  return (
    <Card.Footer as="b">
      <TabNavigation changeTab={changeTab} tabNames={tabNames} />
    </Card.Footer>
  );
};
FooterTabs.propTypes = {
  changeTab: PropTypes.func.isRequired,
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const EditorWithTabs = ({
  data,
  iterations,
  setIterations,
  setData,
  code,
  setCode,
}) => {
  const tabs = [
    {
      href: "#editor",
      title: "Editor",
    },
    {
      href: "#iterations",
      title: "Iterations",
    },
    {
      href: "#data",
      title: "Data",
    },
  ];

  const [selected, setSelected] = useState("#editor");
  const selectTab = (selection) => {
    if (selection === "#iterations") {
      return (
        <Card.Body>
          <IterationsOptions
            iterations={iterations}
            setIterations={setIterations}
          />
        </Card.Body>
      );
    }
    if (selection === "#editor") {
      return (
        <MonacoExerciseEditor code={code} setCode={setCode} language="java" />
      );
    }
    if (selection === "#data") {
      return <DataOptions data={data} setData={setData} height="500" />;
    }
    return <div />;
  };
  return (
    <>
      {selectTab(selected)}
      <FooterTabs changeTab={setSelected} tabNames={tabs} />
    </>
  );
};
EditorWithTabs.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  setData: PropTypes.func.isRequired,
  iterations: PropTypes.number.isRequired,
  setIterations: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
};

const TabNavigation = ({ changeTab, tabNames }) => {
  return (
    <Nav
      onSelect={(selectedKey) => changeTab(selectedKey)}
      fill
      variant="tabs"
      defaultActiveKey={tabNames[0].href}
    >
      {tabNames.map((tabName) => {
        return (
          <Nav.Item key={tabName.href}>
            <Nav.Link href={tabName.href}>{tabName.title}</Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};
TabNavigation.propTypes = {
  changeTab: PropTypes.func.isRequired,
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const InformationArea = ({ consoleOutput, alert, summary }) => {
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
InformationArea.propTypes = {
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

const AnimationTab = ({ solution, weights, animation, solutions }) => {
  return (
    <ShadowedCard>
      <Card.Header as="h5" className="dark-blue-text">
        Animation
      </Card.Header>
      <Card.Body>
        <Container style={{ background: "white", textAlign: "center" }}>
          {animation({ solution, weights, solutions })}
        </Container>
      </Card.Body>
    </ShadowedCard>
  );
};
AnimationTab.propTypes = {
  solution: PropTypes.arrayOf(PropTypes.number).isRequired,
  solutions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  weights: PropTypes.arrayOf(PropTypes.any).isRequired,
  animation: PropTypes.element.isRequired,
};

const SubmitCodeButton = ({ callback, isLoading }) => {
  return (
    <div className="float-right">
      {isLoading && (
        <Spinner
          animation="grow"
          size="sm"
          role="status"
          className="dark-blue"
        />
      )}{" "}
      <Button
        type="button"
        className="btn-dark-blue"
        variant="primary"
        onClick={callback}
      >
        Submit Code
      </Button>
    </div>
  );
};
SubmitCodeButton.propTypes = {
  callback: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ExercisePage;
