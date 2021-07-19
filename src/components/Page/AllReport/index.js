// import React from "react";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Researcher from "./Researcher";
import Research from "./Research";
import Budget from "./Budget";
import Welcome from "../Home/welcome";

function AllReport() {
  return (
    <div>
      <div className="wrapper">
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid" style={{ textAlign: "left" }}>
              <h1
                className="text-dark"
                style={{ padding: "0.25rem", marginLeft: "3.5rem" }}
              >
                สรุปรายงาน
              </h1>
              <div className="projcard-bar"></div>
            </div>
          </div>

          <div className="content">
            <div className="container-fluid">
              <div className="container">
                <Welcome />
                <div className="card card-primary card-outline">
                  <Switch>
                    <Route exact path="/allreport" component={Researcher} />
                    <Route
                      exact
                      path="/allreport/reportbudget"
                      component={Budget}
                    />
                    <Route
                      exact
                      path="/allreport/reportresearch"
                      component={Research}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllReport;
