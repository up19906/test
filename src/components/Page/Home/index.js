// import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
import "./style.scss";
import Funding from "./funding";
import FindingAcademic from "./fundingAcademic";
import Welcome from "./welcome";

export default function Home() {
  const [usergroup, setusergroup] = useState([]);
  const [proposal, setProposal] = useState([]);
  const [budget, setBudget] = useState(0);
  const [budget_academic, setbudget_academic] = useState(0);
  const [coordinator_fundingagency, setcoordinator_fundingagency] = useState(0);
  const [coordinator_academic, setcoordinator_academic] = useState(0);

  var d = new Date();
  const date = d.getFullYear() + 543;

  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/user_group").then((usergroup) => {
      setusergroup(usergroup.data);
      // console.log("test_user_group", usergroup);
    });
    Axios.get("http://localhost:4000/api/get/concept_proposal").then(
      (proposal) => {
        setProposal(proposal.data);
        // console.log("test_proposal", proposal);
      }
    );
    Axios.get(
      `http://localhost:4000/api/get/sum_coordinater_funding_budget/${date}`
    ).then((sumbudget) => {
      if (sumbudget.data.sum == null) {
        setBudget(0);
        console.log("test_budget1", sumbudget);
      } else {
        setBudget(sumbudget.data.sum);
        console.log("test_budget2", sumbudget);
      }
      // console.log("test_budget3", sumbudget);
    });
    Axios.get(
      `http://localhost:4000/api/get/sum_coordinater_funding_budget_academic/${date}`
    ).then((sumbudget) => {
      if (!sumbudget.data) {
        setbudget_academic(0);
      } else {
        setbudget_academic(sumbudget.data.sum);
      }
      // console.log("test_setbudget_academic", sumbudget);
    });
    Axios.get(
      `http://localhost:4000/api/get/count_coordinator_fundingagency/${date}`
    ).then((count_fundingagency) => {
      if (!count_fundingagency.data) {
        setcoordinator_fundingagency(0);
        console.log("test_count_funding : null");
      } else {
        setcoordinator_fundingagency(count_fundingagency.data.count);
        console.log("test_count_funding", count_fundingagency);
      }
    });
    Axios.get(
      `http://localhost:4000/api/get/count_coordinator_fundingagency_academic/${date}`
    ).then((count_funding_ac) => {
      if (!count_funding_ac) {
        setcoordinator_academic(0);
        console.log("test_count_funding_ac : null");
      } else {
        setcoordinator_academic(count_funding_ac.data.count);
        console.log("test_count_funding_ac", count_funding_ac);
      }
    });
  }, []);

  return (
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

            <Row className="row_padding">
              <Col md={3} lg={3}>
                <div className="card card-primary card-outline">
                  <Row>
                    <Col lg={12} style={{ textAlign: "center" }}>
                      <div className="card-header">
                        <h6 className="m-0">จำนวนนักวิจัยภายในระบบ</h6>
                      </div>
                      <div className="card-body">
                        <h5 className="card-text">{usergroup.length} คน</h5>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={3} Lg={3}>
                <div className="card card-primary card-outline">
                  <Row>
                    <Col lg={12} style={{ textAlign: "center" }}>
                      <div className="card-header">
                        <h6 className="m-0">โครงการวิจัยที่ได้รับการจัดสรร</h6>
                      </div>
                      <div className="card-body">
                        <h5 className="card-text">{proposal.length} โครงการ</h5>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={3} lg={3}>
                <div className="card card-primary card-outline">
                  <Row>
                    <Col lg={12} style={{ textAlign: "center" }}>
                      <div className="card-header">
                        <h6 className="m-0">
                          จำนวนงบประมาณที่ได้รับ ประจำปี {d.getFullYear() + 543}
                        </h6>
                      </div>
                      <div className="card-body">
                        <h5 className="card-text">
                          {budget + budget_academic} บาท
                        </h5>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={3} lg={3}>
                <div className="card card-primary card-outline">
                  <Row>
                    <Col lg={12} style={{ textAlign: "center" }}>
                      <div className="card-header">
                        <h6 className="m-0">
                          จำนวนแหล่งทุน ประจำปี {d.getFullYear() + 543}
                        </h6>
                      </div>
                      <div className="card-body">
                        <h5 className="card-text">
                          {coordinator_fundingagency + coordinator_academic} ทุน
                        </h5>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <Funding />
            <br />
            <FindingAcademic />
          </div>
        </div>
      </div>
    </div>
  );
}
