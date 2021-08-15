// import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getUsergroup,
  getConcept_proposal,
  getFunding_budget,
  getFunding_academic_budget,
  getFunding_count,
  getFunding_academic_count,
} from "../../../redux/home/action";
import "./style.scss";
import Funding from "./funding";
import Welcome from "./welcome";
import ShowConceptProposal from "./showconceptproposal";

function Home(props) {
  var d = new Date();
  const date = d.getFullYear() + 543;

  useEffect(() => {
    props.getUsergroup();
    props.getConcept_proposal();
    props.getFunding_budget(date);
    props.getFunding_academic_budget(date);
    props.getFunding_count(date);
    props.getFunding_academic_count(date);
  }, []);

  return (
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

            <Row className="row_padding">
              <Col md={3} lg={3}>
                <div className="card card-primary card-outline">
                  <Row>
                    <Col lg={12} style={{ textAlign: "center" }}>
                      <div className="card-header">
                        <h6 className="m-0">จำนวนนักวิจัยภายในระบบ</h6>
                      </div>
                      <div className="card-body">
                        <h5 className="card-text">
                          {props.statehome.usergroup.length} คน
                        </h5>
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
                        <h5 className="card-text">
                          {props.statehome.conceptproposal.length} โครงการ
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
                          จำนวนงบประมาณที่ได้รับ ประจำปี {d.getFullYear() + 543}
                        </h6>
                      </div>
                      <div className="card-body">
                        <h5 className="card-text">
                          {props.statehome.funding_budget +
                            props.statehome.funding_academic_budget}{" "}
                          บาท
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
                          {props.statehome.count_funding.length +
                            props.statehome.count_funding_academic.length}{" "}
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
            <ShowConceptProposal />
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    statehome: state.statehome,
    menu: state.header.menu,
  };
};

export default connect(mapStateToProps, {
  getUsergroup,
  getConcept_proposal,
  getFunding_budget,
  getFunding_academic_budget,
  getFunding_count,
  getFunding_academic_count,
})(Home);
