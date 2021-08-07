import { useState } from "react";
import { distances } from "./tsp.data.48.json";
import { exercise } from "./tsp.exercise.json";
import { submitDemo, submitExercise } from "./tsp.Service";

const getStateAndFunctions = () => {
  const [code, setCode] = useState(exercise.defaultStarterCode);
  const [isLoading, setLoading] = useState(false);
  const [iterations, setIterations] = useState(exercise.iterations.toString());
  const [exerciseData, setExerciseData] = useState(
    JSON.stringify({ data: distances }, null, 2)
  );
  const [consoleOutput, setConsoleOutput] = useState(
    "There's nothing here yet"
  );
  const [isSuccess, setSuccess] = useState(false);
  const [result, setResult] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [data, setData] = useState(distances);
  const [summary, setSummary] = useState({
    fitness: 0,
    timeRun: 0,
    iterations: 0,
    efficacy: 0,
  });
  const [showAlert, setShowAlert] = useState(false);

  const updateState = (requestResult) => {
    setSuccess(requestResult.isSuccess);
    setConsoleOutput(requestResult.consoleOutput);
    setResult(requestResult.result);
    setSolutions(requestResult.solutions);
    setData(requestResult.data);
    setSummary(requestResult.summary);
    setShowAlert(!requestResult.isSuccess);
  };

  const runDemo = (algorithm, extraFields) => {
    setLoading(true);

    const request = {
      problem: exercise.problem,
      algorithm,
      data: exercise.data,
      ...extraFields,
    };

    submitDemo(request)
      .then((res) => res.json())
      .then((requestResult) => updateState(requestResult))
      .finally(() => setLoading(false));
  };

  const runCode = () => {
    setLoading(true);

    const request = {
      ...exercise,
      code,
      data,
      iterations: Number.parseInt(iterations, 10),
    };

    submitExercise(request)
      .then((res) => res.json())
      .then((requestResult) => updateState(requestResult))
      .finally(() => setLoading(false));
  };

  return {
    state: {
      code,
      isLoading,
      iterations,
      exerciseData,
      summary,
      isSuccess,
      consoleOutput,
      result,
      solutions,
      data,
      showAlert,
    },
    functions: {
      setCode,
      setLoading,
      setIterations,
      setExerciseData,
      setConsoleOutput,
      setSuccess,
      setResult,
      setSolutions,
      setData,
      setSummary,
      runDemo,
      runCode,
    },
  };
};

export default getStateAndFunctions;
