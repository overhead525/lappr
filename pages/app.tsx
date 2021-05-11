import Dashboard from "../components/dashboard";

const App = () => {
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
      <Dashboard />
    </div>
  );
};

export default App;
