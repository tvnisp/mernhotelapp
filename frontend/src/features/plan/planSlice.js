import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import planService from "./planService";

const initialState = {
  plans: [],
  plan: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add new plan
export const createPlan = createAsyncThunk(
  "plans/create",
  async (planData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await planService.createPlan(planData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get plans
export const getPlans = createAsyncThunk("plans/all", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await planService.getPlans(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Delete plan
export const deletePlan = createAsyncThunk(
  "plans/delete",
  async (planID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await planService.deletePlan(planID, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPlan.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPlans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plans = action.payload;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deletePlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = state.plans.filter(
          (plan) => plan._id !== action.payload.id
        );
      });
  },
});

export const { reset } = planSlice.actions;
export default planSlice.reducer;
