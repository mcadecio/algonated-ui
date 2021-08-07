import { post } from "../../common/api.Service";

const demoResource = "/exercise/demo/scales";
const exerciseResource = "/exercise/submit/scales";

const submitDemo = (body) => post(demoResource, body);
const submitExercise = (body) => post(exerciseResource, body);

export { submitDemo, submitExercise };
