import React from "react";
import { Outlet } from "react-router-dom";
import "./styles.css";

const App = () => {
  return (
    <div classname="App">
      <Outlet />
    </div>
  );
};

export default App;
