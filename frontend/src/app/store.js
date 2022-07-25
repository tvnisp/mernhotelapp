import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import incidentReducer from "../features/incident/incidentSlice";
import handoverReducer from "../features/handover/handoverSlice";
import planReducer from "../features/plan/planSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    incidents: incidentReducer,
    handovers: handoverReducer,
    plans: planReducer,
  },
});
