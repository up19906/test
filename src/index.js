import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import "./styles_header.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../src/style/plugins/fontawesome-free/css/all.min.css";
import "../src/style/dist/css/adminlte.min.css";
import "../src/style/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
// import "../../../style/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
// import "../src/style/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
// import "../src/style/plugins/jqvmap/jqvmap.min.css";
// import "../src/style/plugins/daterangepicker/daterangepicker.css";
// import "../../../style/plugins/summernote/summernote-bs4.min.css";
import "../src/components/Header/style.scss";
// import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter basename={"/up_test"}>
    <App />
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
