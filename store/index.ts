import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "../features/screen/screenSlice";

export default configureStore({
  reducer: {
    screen: screenReducer,
  },
  devTools: true,
});
