import React from "react";
import ReactDOM from "react-dom";
import Root from "./root.component";
import * as singleSpa from "single-spa";

ReactDOM.render(<Root />, document.getElementById("single-spa-playground"));
singleSpa.start();
window.singleSpa = singleSpa;
