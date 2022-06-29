import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import handoverService from "./handoverService";

const initialState = {
  handovers: [],
  handover: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add new handover
export const createHandover = createAsyncThunk(
  "handovers/create",
  async (handoverData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await handoverService.createHandover(handoverData, token);
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

// Get handovers
export const getHandovers = createAsyncThunk(
  "handovers/all",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await handoverService.getHandovers(token);
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

// // Get incident
// export const getIncident = createAsyncThunk(
//   "incidents/get",
//   async (incidentId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await incidentService.getIncident(incidentId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// Delete handover
export const deleteHandover = createAsyncThunk(
  "handovers/delete",
  async (handoverID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await handoverService.deleteHandover(handoverID, token);
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

export const handoverSlice = createSlice({
  name: "handover",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHandover.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHandover.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createHandover.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getHandovers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHandovers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.handovers = action.payload;
      })
      .addCase(getHandovers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(getIncident.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getIncident.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.incident = action.payload;
      // })
      // .addCase(getIncident.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })
      .addCase(deleteHandover.fulfilled, (state, action) => {
        state.isLoading = false;
        state.handovers = state.handovers.filter(
          (handover) => handover._id !== action.payload.id
        );
      });
    // .addCase(assignIncident.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.incidents.map((incident) => {
    //     if (incident._id === action.payload._id) {
    //       return (
    //         (incident.status = "open"),
    //         (incident.assignedTo = action.payload.assignedTo)
    //       );
    //     } else {
    //       return incident;
    //     }
    //   });
    // })
    // .addCase(closeIncident.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.incidents.map((incident) => {
    //     if (incident._id === action.payload._id) {
    //       return (
    //         (incident.status = "closed"),
    //         (incident.resolvedAt = action.payload.resolvedAt)
    //       );
    //     } else {
    //       return incident;
    //     }
    //   });
    // });
  },
});

export const { reset } = handoverSlice.actions;
export default handoverSlice.reducer;
