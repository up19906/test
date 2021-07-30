import React from "react";
import { connect } from "react-redux";
// import Axios from "axios";
// import { Switch, Route } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import AddFundingResearch from "./AddFundingResearch";
// import AddFundingAcademic from "./AddFundingAcademic";
import Welcome from "../Home/welcome";
import AddAboutResearch from "./AddAboutResearch";
// import AddResearch from "./AddResearch";
function AboutResearch(props) {
  return (
    <div>
      <div className="wrapper">
        <div className={`content-wrapper ${props.menu && "  content-side"}`}>
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
                  <AddAboutResearch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    menu: state.header.menu,
  };
};

export default connect(mapStateToProps)(AboutResearch);
