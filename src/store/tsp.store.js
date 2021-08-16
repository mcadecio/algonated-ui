import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { exercise } from "../components/tsp/tsp.exercise.json";
import { distances } from "../components/tsp/tsp.data.48.json";
import { submitDemo, submitExercise } from "../components/tsp/tsp.Service";
import {
  selectCode,
  selectIterations,
  selectData as selectExerciseData,
} from "./exercise.store";

const initialState = {
  isLoading: false,
  exerciseData: JSON.stringify({ data: distances }),
  consoleOutput: "There's nothing here yet",
  result: [],
  solutions: [],
  data: distances,
  summary: {
    fitness: 0,
    timeRun: 0,
    iterations: 0,
    efficacy: 0,
  },
  showAlert: false,
};

const getters = {
  selectIsLoading: (state) => state.tsp.isLoading,
  selectConsoleOutput: (state) => state.tsp.consoleOutput,
  selectResult: (state) => state.tsp.result,
  selectSolutions: (state) => state.tsp.solutions,
  selectData: (state) => state.tsp.data,
  selectSummary: (state) => state.tsp.summary,
  selectShowAlert: (state) => state.tsp.showAlert,
};

export const {
  selectData,
  selectConsoleOutput,
  selectIsLoading,
  selectResult,
  selectShowAlert,
  selectSolutions,
  selectSummary,
} = getters;

export const runCode = createAsyncThunk(
  "tsp/runCode",
  async (arg, { getState }) => {
    const request = {
      ...exercise,
      code: selectCode(getState()),
      data: JSON.parse(selectExerciseData(getState())).data,
      iterations: Number.parseInt(selectIterations(getState()), 10),
    };

    const response = await submitExercise(request);

    return response.json();
  }
);

export const runDemo = createAsyncThunk(
  "tsp/runDemo",
  async ({ algorithm, extraFields }) => {
    const request = {
      problem: exercise.problem,
      algorithm,
      ...extraFields,
    };

    const response = await submitDemo(request);

    return response.json();
  }
);

export const tspStore = createSlice({
  name: "tsp",
  initialState,
  reducers: {
    updateCode: (state, { payload }) => {
      state.code = payload;
    },
    updateIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateIterations: (state, action) => {
      state.iterations = action.payload;
    },
    updateExerciseData: (state, action) => {
      state.exerciseData = action.payload;
    },
    updateResult: (state, action) => {
      state.result = action.payload;
    },
    updateSolutions: (state, action) => {
      state.solutions = action.payload;
    },
    updateData: (state, action) => {
      state.data = action.payload;
    },
    updateSummary: (state, action) => {
      state.summary = action.payload;
    },
    updateShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(runCode.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.consoleOutput = payload.consoleOutput;
        state.result = payload.result;
        state.solutions = payload.solutions;
        state.data = payload.data;
        state.summary = payload.summary;
        state.showAlert = !payload.isSuccess;
      })
      .addCase(runCode.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(runDemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(runDemo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.consoleOutput = payload.consoleOutput;
        state.result = payload.result;
        state.solutions = payload.solutions;
        state.data = payload.data;
        state.summary = payload.summary;
        state.showAlert = !payload.isSuccess;
      })
      .addCase(runDemo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  updateCode,
  updateExerciseData,
  updateIsLoading,
  updateSummary,
} = tspStore.actions;

export default tspStore.reducer;
