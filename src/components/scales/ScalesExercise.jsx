import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import DangerDismissibleAlert from "../../atoms/DangerDismissibleAlert";
import ExerciseProblem from "../exercise/ExerciseProblem";
import "./styles.css";
import "../anime.css";
import { name, exercise } from "./scales.exercise.json";
import ScalesDescription from "./ScalesDescription";
import BalanceAnimation from "./animations/BalanceAnimation";
import ExerciseCodingArea from "../exercise/ExerciseCodingArea";
import SubmitCodeButton from "../../atoms/SubmitCodeButton";
import ExerciseAnimationCard from "../exercise/animationCard/ExerciseAnimationCard";
import ExerciseInfo from "../exercise/ExerciseInfo";
import {
  selectConsoleOutput,
  selectData,
  selectIsLoading,
  selectResult,
  selectShowAlert,
  selectSolutions,
  selectSummary,
  runCode,
  runDemo,
} from "../../store/scales.store";
import { updateCode, updateData } from "../../store/exercise.store";

const ScalesExercise = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const consoleOutput = useSelector(selectConsoleOutput);
  const summary = useSelector(selectSummary);
  const showAlert = useSelector(selectShowAlert);
  const solutions = useSelector(selectSolutions);
  const result = useSelector(selectResult);
  const data = useSelector(selectData);
  const exerciseData = JSON.stringify({ data: exercise.data }, null, 2);
  const alert = DangerDismissibleAlert({
    innerText: "It looks like something went wrong, check the output !",
  });

  useEffect(() => {
    alert.setShow(showAlert);
  }, [showAlert]);

  useEffect(() => {
    dispatch(updateCode(exercise.defaultStarterCode));
    dispatch(updateData(exerciseData));
  }, []);

  return (
    <div className="scales-exercise">
      <ExerciseProblem name={name}>
        <ScalesDescription />
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
            <BalanceAnimation
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

export default ScalesExercise;
