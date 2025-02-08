import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../featrues/authSlice";
import { authApi } from "../featrues/api/authApi";
import { courseApi } from "@/featrues/api/courseApi";
import { purchaseApi } from "@/featrues/api/purchaseApi";
import { courseProgressApi } from "@/featrues/api/courseProgressApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [courseProgressApi.reducerPath]: courseProgressApi.reducer,
  auth: authReducer,
});

export default rootReducer;
