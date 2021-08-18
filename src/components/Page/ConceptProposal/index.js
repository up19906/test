import React from "react";
// import Axios from "axios";
import { Switch, Route } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import AddFundingResearch from "./AddFundingResearch";
// import AddFundingAcademic from "./AddFundingAcademic";
import { connect } from "react-redux";
import Welcome from "../Home/welcome";
// import AddAboutResearch from "../AddFunding/AddAboutResearch";
import AddConceptproposal from "./AddConceptproposal";
import AddSubConcept from "./AddSubConcept";
import AddStudyArea from "./AddStudyArea";
import Network from "./Network";

function Conceptproposal(props) {
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
                ข้อเสนอโครงการ
              </h1>
              <div className="projcard-bar"></div>
            </div>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="container">
                <Welcome />
                <div className="card card-primary card-outline">
                  <div className="card-header">
                    <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
                      ข้อเสนองานวิจัย / งานบริการวิชาการ
                    </h4>
                  </div>
                  <Switch>
                    <Route
                      exact
                      path="/conceptproposal"
                      component={AddConceptproposal}
                    />
                    <Route
                      exact
                      path="/conceptproposal/addsubconcept"
                      component={AddSubConcept}
                    />
                    <Route
                      path="/conceptproposal/studyarea"
                      component={AddStudyArea}
                    />
                    <Route path="/conceptproposal/network" component={Network} />
                  </Switch>

                  {/* <AddConceptproposal /> */}
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

export default connect(mapStateToProps)(Conceptproposal);
