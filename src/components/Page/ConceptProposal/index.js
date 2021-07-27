import React from "react";
// import Axios from "axios";
// import { Switch, Route } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import AddFundingResearch from "./AddFundingResearch";
// import AddFundingAcademic from "./AddFundingAcademic";
import Welcome from "../Home/welcome";
// import AddAboutResearch from "../AddFunding/AddAboutResearch";
import AddConceptproposal from "./AddConceptproposal";

export default function Conceptproposal() {
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
                กองนโยบายและแผน
              </h1>
              <div className="projcard-bar"></div>
            </div>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="container">
                <Welcome />
                <div className="card card-primary card-outline">
                  <AddConceptproposal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
