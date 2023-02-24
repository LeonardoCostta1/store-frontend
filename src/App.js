import React from "react";
import "./App.css";

import Router from "./routes";
import { useSelector } from "react-redux";
import Loading from "../src/components/Loading";
// import Player from "./components/Player/Player";
import Menu from "./components/Menu";

function App() {
  const load = useSelector((state) => state.loading.value);
  return (
    <div className="App">
      {load && <Loading />}
      <Menu/>
      <Router />
      {/* <Player /> */}
    </div>
  );
}

export default App;
