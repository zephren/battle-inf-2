import * as React from "react";
import * as ReactDOM from "react-dom";
import Store from "./store";
import map from "./config/map";
import { Main } from "./components/Main";
import "./lib/town-tick";

map(Store.getState().mapState);

ReactDOM.render(<Main />, document.getElementById("app"));
