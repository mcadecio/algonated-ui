import { post } from "../../common/api.Service";

const demoResource = "/exercise/demo/tsp";
const exerciseResource = "/exercise/submit/tsp";

const submitDemo = (body) => post(demoResource, body);
const submitExercise = (body) => post(exerciseResource, body);

export { submitDemo, submitExercise };
