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
  const [budget, setBudget] = useState([]);
  const [budget_academic, setbudget_academic] = useState([]);
  const [coordinator_fundingagency, setcoordinator_fundingagency] = useState(
    []
  );
  const [coordinator_academic, setcoordinator_academic] = useState([]);

  var d = new Date();
  const date = d.getFullYear() + 543;

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get/user_group").then((usergroup) => {
      setusergroup(usergroup.data);
      console.log("test_user_group", usergroup);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get/concept_proposal").then(
      (proposal) => {
        setProposal(proposal.data);
        console.log("test_proposal", proposal);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get(
      `http://localhost:3002/api/get/sum_coordinater_funding_budget/${date}`
    ).then((sumbudget) => {
      if (!sumbudget.data) {
        return <div />;
      } else {
        if (sumbudget.data[0].sum == null) {
          setBudget(0);
        } else {
          setBudget(sumbudget.data[0].sum);
        }
      }

      console.log("test_budget", sumbudget);
    });
  }, [date]);

  useEffect(() => {
    Axios.get(
      `http://localhost:3002/api/get/sum_coordinater_funding_budget_academic/${date}`
    ).then((sumbudget) => {
      if (sumbudget.data[0].sum == null) {
        setbudget_academic(0);
      } else {
        setbudget_academic(sumbudget.data[0].sum);
      }
      console.log("test_setbudget_academic", sumbudget);
    });
  }, [date]);

  useEffect(() => {
    Axios.get(
      `http://localhost:3002/api/get/count_coordinator_fundingagency/${date}`
    ).then((count_fundingagency) => {
      setcoordinator_fundingagency(count_fundingagency.data);
      console.log("test_count_fundingagency", count_fundingagency);
    });
  }, [date]);

  useEffect(() => {
    Axios.get(
      `http://localhost:3002/api/get/count_coordinator_fundingagency_academic/${date}`
    ).then((count_fundingagency) => {
      setcoordinator_academic(count_fundingagency.data);
      console.log("test_count_fundingagency", count_fundingagency);
    });
  }, [date]);
  // if (!usergroup || !proposal || !budget || !coordinator_fundingagency) {
  //   return <div />;
  // }

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

            <Row style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
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
                          {coordinator_fundingagency.length +
                            coordinator_academic.length}{" "}
                          ทุน
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
