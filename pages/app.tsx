import Dashboard from "../components/dashboard";
import { useSelector } from "react-redux";
import { currentScreenSelector } from "../features/screen/screenSlice";

const App = () => {
  const currentScreen = useSelector(currentScreenSelector);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "#121212",
        display: "grid",
        placeItems: "center",
      }}
    >
      {currentScreen ? currentScreen : <Dashboard />}
    </div>
  );
};

export default App;
