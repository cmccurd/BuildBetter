import React from "react";
import ReactDOM from "react-dom";
import Decklist from "./Decklist.jsx"
import "./styles.css";


var mountNode = document.getElementById("app");
ReactDOM.render(<Decklist />, mountNode);