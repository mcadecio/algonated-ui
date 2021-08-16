import { configureStore } from "@reduxjs/toolkit";
import tspReducer from "./tsp.store";
import scalesReducer from "./scales.store";
import exerciseReducer from "./exercise.store";

const store = configureStore({
  reducer: {
    tsp: tspReducer,
    scales: scalesReducer,
    exercise: exerciseReducer,
  },
});

export default store;
