import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ReactGA from "react-ga";

ReactGA.initialize("G-K7S5QSNRJ7");

document.addEventListener("turbo:load", () => {
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );
  root.render(<App />);
});
