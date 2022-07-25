import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import incidentService from "./incidentService";

const initialState = {
  incidents: [],
  incident: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add new incident
export const createIncident = createAsyncThunk(
  "incidents/create",
  async (incidentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await incidentService.createIncident(incidentData, token);
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

// Assign incident
export const assignIncident = createAsyncThunk(
  "incidents/assign",
  async (incidentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const user = thunkAPI.getState().auth.user;
      return await incidentService.assignIncident(incidentId, user, token);
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

// Get incidents
export const getIncidents = createAsyncThunk(
  "incidents/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await incidentService.getIncidents(token);
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

// Get incident
export const getIncident = createAsyncThunk(
  "incidents/get",
  async (incidentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await incidentService.getIncident(incidentId, token);
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

// Close incident
export const closeIncident = createAsyncThunk(
  "incidents/close",
  async (incidentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await incidentService.closeIncident(incidentId, token);
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

// Delete incident
export const deleteIncident = createAsyncThunk(
  "incidents/delete",
  async (incidentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await incidentService.deleteIncident(incidentId, token);
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

export const incidentSlice = createSlice({
  name: "incident",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIncident.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIncident.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createIncident.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getIncidents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncidents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incidents = action.payload;
      })
      .addCase(getIncidents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getIncident.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incident = action.payload;
      })
      .addCase(getIncident.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteIncident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.incidents = state.incidents.filter(
          (incident) => incident._id !== action.payload.id
        );
      })
      .addCase(assignIncident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.incidents.map((incident) => {
          if (incident._id === action.payload._id) {
            return (
              (incident.status = "open"),
              (incident.assignedTo = action.payload.assignedTo)
            );
          } else {
            return incident;
          }
        });
      })
      .addCase(closeIncident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.incidents.map((incident) => {
          if (incident._id === action.payload._id) {
            return (
              (incident.status = "closed"),
              (incident.resolvedAt = action.payload.resolvedAt)
            );
          } else {
            return incident;
          }
        });
      });
  },
});

export const { reset } = incidentSlice.actions;
export default incidentSlice.reducer;
