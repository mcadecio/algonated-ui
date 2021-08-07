import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DangerDismissibleAlert from "../../atoms/DangerDismissibleAlert";
import ExerciseProblem from "../exercise/ExerciseProblem";
import "./styles.css";
import "../anime.css";
import { name } from "./scales.exercise.json";
import getStateAndFunctions from "./index";
import ScalesDescription from "./ScalesDescription";
import BalanceAnimation from "./animations/BalanceAnimation";
import ExerciseCodingArea from "../exercise/ExerciseCodingArea";
import SubmitCodeButton from "../../atoms/SubmitCodeButton";
import ExerciseAnimationCard from "../exercise/animationCard/ExerciseAnimationCard";
import ExerciseInfo from "../exercise/ExerciseInfo";

const ScalesExercise = () => {
  const { state, functions } = getStateAndFunctions();
  const alert = DangerDismissibleAlert({
    innerText: "It looks like something went wrong, check the output !",
  });

  useEffect(() => {
    alert.setShow(state.showAlert);
  }, [state.showAlert]);

  return (
    <div className="scales-exercise">
      <ExerciseProblem name={name}>
        <ScalesDescription />
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
            <BalanceAnimation
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

export default ScalesExercise;
