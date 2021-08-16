import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import DangerDismissibleAlert from "../../atoms/DangerDismissibleAlert";
import ExerciseProblem from "../exercise/ExerciseProblem";
import "./styles.css";
import "../anime.css";
import config from "./tsp.exercise.json";
import TSPDescription from "./TSPDescription";
import { FixedNetworkAnimation } from "./animations/TSPAnimations";
import SubmitCodeButton from "../../atoms/SubmitCodeButton";
import ExerciseCodingArea from "../exercise/ExerciseCodingArea";
import ExerciseInfo from "../exercise/ExerciseInfo";
import ExerciseAnimationCard from "../exercise/animationCard/ExerciseAnimationCard";
import { updateCode, updateData } from "../../store/exercise.store";
import { distances } from "./tsp.data.48.json";
import {
  runCode,
  runDemo,
  selectConsoleOutput,
  selectData,
  selectIsLoading,
  selectResult,
  selectShowAlert,
  selectSolutions,
  selectSummary,
} from "../../store/tsp.store";

const TSPExercise = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const consoleOutput = useSelector(selectConsoleOutput);
  const summary = useSelector(selectSummary);
  const showAlert = useSelector(selectShowAlert);
  const solutions = useSelector(selectSolutions);
  const result = useSelector(selectResult);
  const data = useSelector(selectData);
  const exerciseData = JSON.stringify({ data: distances }, null, 2);
  const alert = DangerDismissibleAlert({
    innerText: "It looks like something went wrong, check the output !",
  });

  useEffect(() => {
    alert.setShow(showAlert);
  }, [showAlert]);

  useEffect(() => {
    dispatch(updateCode(config.exercise.defaultStarterCode));
    dispatch(updateData(exerciseData));
  }, []);

  return (
    <div className="tsp-exercise">
      <ExerciseProblem name={config.name}>
        <TSPDescription />
      </ExerciseProblem>
      <br />
      <Row xs={1} sm={1} md={1} lg={1} xl={2}>
        <Col>
          <ExerciseCodingArea
            data={exerciseData}
            demoCallback={(algorithm, extraFields) =>
              dispatch(runDemo({ algorithm, extraFields }))
            }
          />
          <SubmitCodeButton
            isLoading={isLoading}
            callback={() => dispatch(runCode())}
          />
        </Col>
        <Col>
          <ExerciseInfo
            alert={alert.alert}
            consoleOutput={consoleOutput}
            summary={summary}
          />
          <br />
          <ExerciseAnimationCard>
            <FixedNetworkAnimation
              solutions={solutions}
              solution={result}
              weights={data}
            />
          </ExerciseAnimationCard>
        </Col>
      </Row>
    </div>
  );
};

export default TSPExercise;
