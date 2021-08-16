import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { exercise } from "../components/scales/scales.exercise.json";
import {
  submitDemo,
  submitExercise,
} from "../components/scales/scales.Service";
import {
  selectCode,
  selectIterations,
  selectData as selectExerciseData,
} from "./exercise.store";

const initialState = {
  isLoading: false,
  exerciseData: JSON.stringify({ data: exercise.data }),
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
  showAlert: false,
};

const getters = {
  selectIsLoading: (state) => state.scales.isLoading,
  selectConsoleOutput: (state) => state.scales.consoleOutput,
  selectResult: (state) => state.scales.result,
  selectSolutions: (state) => state.scales.solutions,
  selectData: (state) => state.scales.data,
  selectSummary: (state) => state.scales.summary,
  selectShowAlert: (state) => state.scales.showAlert,
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
  "scales/runCode",
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
  "scales/runDemo",
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

export const scalesStore = createSlice({
  name: "scales",
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
} = scalesStore.actions;

export default scalesStore.reducer;
