import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DangerDismissibleAlert from "../../atoms/DangerDismissibleAlert";
import ExerciseProblem from "../exercise/ExerciseProblem";
import "./styles.css";
import "../anime.css";
import config from "./tsp.exercise.json";
import TSPDescription from "./TSPDescription";
import getStateAndFunctions from "./index";
import { FixedNetworkAnimation } from "./animations/TSPAnimations";
import SubmitCodeButton from "../../atoms/SubmitCodeButton";
import ExerciseCodingArea from "../exercise/ExerciseCodingArea";
import ExerciseInfo from "../exercise/ExerciseInfo";
import ExerciseAnimationCard from "../exercise/animationCard/ExerciseAnimationCard";

const TSPExercise = () => {
  const { state, functions } = getStateAndFunctions();
  const alert = DangerDismissibleAlert({
    innerText: "It looks like something went wrong, check the output !",
  });

  useEffect(() => {
    alert.setShow(state.showAlert);
  }, [state.showAlert]);

  return (
    <div className="tsp-exercise">
      <ExerciseProblem name={config.name}>
        <TSPDescription />
      </ExerciseProblem>
      <br />
      <Row xs={1} sm={1} md={1} lg={1} xl={2}>
        <Col>
          <ExerciseCodingArea
            code={state.code}
            setCode={functions.setCode}
            iterations={state.iterations}
            setIterations={functions.setIterations}
            data={state.exerciseData}
            setData={functions.setExerciseData}
            demoCallback={functions.runDemo}
          />
          <SubmitCodeButton
            isLoading={state.isLoading}
            callback={() => functions.runCode()}
          />
        </Col>
        <Col>
          <ExerciseInfo
            alert={alert.alert}
            consoleOutput={state.consoleOutput}
            summary={state.summary}
          />
          <br />
          <ExerciseAnimationCard>
            <FixedNetworkAnimation
              solutions={state.solutions}
              solution={state.result}
              weights={state.data}
            />
          </ExerciseAnimationCard>
        </Col>
      </Row>
    </div>
  );
};

export default TSPExercise;
