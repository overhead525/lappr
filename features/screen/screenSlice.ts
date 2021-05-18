import { createSlice } from "@reduxjs/toolkit";
import screens from "./screens";

interface SwitchScreenAction {
  payload: {
    screen: string;
  };
  type: string;
}

export const screenSlice = createSlice({
  name: "screen",
  initialState: {
    currentScreen: screens.dashboard,
  },
  reducers: {
    switchScreen: (state, action) => {
      if (screens[action.payload.screen]) {
        state.currentScreen = screens[action.payload.screen];
      }
    },
  },
});

export const { switchScreen } = screenSlice.actions;
export const currentScreenSelector = (state: {
  screen: { currentScreen: JSX.Element };
}): JSX.Element => state.screen.currentScreen;

export default screenSlice.reducer;
