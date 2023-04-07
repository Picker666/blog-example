import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import RootRoute from "./router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";

import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Layout>
        <RootRoute />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
