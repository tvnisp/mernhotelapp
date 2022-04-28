import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import incidentReducer from "../features/incident/incidentSlice";

export const store = configureStore({
  reducer: { auth: authReducer, incidents: incidentReducer },
});
