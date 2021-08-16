import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
  code: "",
  iterations: "0",
};

const getters = {
  selectData: (state) => state.exercise.data,
  selectCode: (state) => state.exercise.code,
  selectIterations: (state) => state.exercise.iterations,
};

export const { selectData, selectCode, selectIterations } = getters;

export const exerciseStore = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    updateData: (state, { payload }) => {
      state.data = payload;
    },
    updateCode: (state, { payload }) => {
      state.code = payload;
    },
    updateIterations: (state, { payload }) => {
      state.iterations = payload;
    },
  },
});

export const { updateData, updateCode, updateIterations } =
  exerciseStore.actions;

export default exerciseStore.reducer;
