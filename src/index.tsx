import * as React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";

function render() {
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(<App />);
}

render();

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    render();
  });
}
