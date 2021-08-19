import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { getcoordinator_funding } from "../../../redux/home/action";
import { getUser } from "../../../redux/conceptProposal/action";

import { getConcept_proposal } from "../../../redux/home/action";

function ShowConceptProposal(props) {
  useEffect(() => {
    props.getcoordinator_funding();
    props.getUser();
    props.getConcept_proposal();
  }, []);

  return (
    <>
      <Row>
        <Col lg={12}>
          <div
            className="card card-primary card-outline"
            style={{ textAlign: "center" }}
          >
            <div className="card-body">
              <h4>ข้อเสนอโครงการ</h4>

              <Row>
                <Col lg={12}>
                  <div className="card">
                    <div className="card-header">
                      <div className="card-tools">
                        <div
                          className="input-group input-group-sm"
                          style={{ width: 150 }}
                        ></div>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div
                      className="card-body table-responsive p-0"
                      style={{ maxHeight: "40vh" }}
                    >
                      <table className="table table-hover text-nowrap table table-head-fixed">
                        <thead>
                          <tr>
                            <th>ชื่อโครงการ</th>
                            <th>ชื่อแหล่งทุน</th>
                            <th>ประจำปี</th>
                            <th>งบประมาณ</th>
                            <th>ผู้รับผิดชอบ</th>
                            <th>สถาบัน</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* เริ่มดึงmap มาตรงนี้ */}
                          {/* {props.statehome.coordinator_funding.length >0 } */}
                          {props.conceptproposal.map(function (data, i) {
                            return (
                              <tr key={i}>
                                <td>{data.concept_proposal_name_th}</td>
                                <td>{data.source_funds_id}</td>
                                <td>{data.concept_year}</td>
                                <td>{data.concept_budget}</td>
                                <td>{data.concept_leader}</td>
                                <td>{data.concept_proposal_institution}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Row>
                    <Col>
                      <div className="center">
                        <NavLink
                          to="/conceptproposal"
                          type="button"
                          className="btn bg-gradient-primary btn-md"
                        >
                          เพิ่มข้อเสนอโครงการ
                        </NavLink>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    statehome: state.statehome,
    conceptproposal: state.statehome.conceptproposal,
  };
};

export default connect(mapStateToProps, {
  getcoordinator_funding,
  getConcept_proposal,
  getUser,
})(ShowConceptProposal);
