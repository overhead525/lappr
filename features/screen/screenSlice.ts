import { createSlice } from "@reduxjs/toolkit";

interface SwitchScreenAction {
  payload: {
    screen: string;
  };
  type: string;
}

export const screenSlice = createSlice({
  name: "screen",
  initialState: {
    currentScreen: "dashboard",
  },
  reducers: {
    switchScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { switchScreen } = screenSlice.actions;
export const currentScreenSelector = (state: {
  screen: { currentScreen: string };
}): string => state.screen.currentScreen;

export default screenSlice.reducer;
