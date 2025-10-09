import React from "react";
import ReactDom from "react-dom/client";
import App from "./App"
import { Provider } from "react-redux";
import Store from './Redux/Store'

const root = ReactDom.createRoot(document.getElementById("root"));
root.render
(
<>
<Provider store={Store}>
<App/>
</Provider>
</>
);
