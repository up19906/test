import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { Row, Col, Button, Modal, Form } from "react-bootstrap";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { connect } from "react-redux";
import {
  getUser,
  getSource_funds,
  getprojecttype,
  getyear,
} from "../../../redux/conceptProposal/action";

import {
  getresearch_faculty,
  getbudget_type,
  getfunding_status,
  insertfunding,
  updatefunding,
  clearfunding,
  getonefunding,
} from "../../../redux/funding/action";

function AddFundingResearch(props) {
  // const form = createRef();

  const [project_type_id, setproject_type_id] = useState(""); //ประเภท
  const [
    coordinater_funding_project_name,
    setcoordinater_funding_project_name,
  ] = useState(""); //ชื่อโครงการ
  const [coordinator_project, setcoordinator_project] = useState(""); //ผู้ประสานงาน
  const [coordinater_funding_agency, setcoordinater_funding_agency] =
    useState(""); //หน่วยงานที่รับผิดชอบ
  const [project_leader, setproject_leader] = useState(""); //นักวิจัยผู้รับผิดชอบ
  const [coordinater_funding_phone, setcoordinater_funding_phone] = useState(0); //เบอร์ติดต่อ
  const coordinater_funding_ac_research_team = []; //เลือกทีมนักวิจัย
  const [
    coordinator_fundingagency_status_id,
    setcoordinator_fundingagency_status_id,
  ] = useState(""); //สถานะโครงการ
  const [coordinater_funding_year, setcoordinater_funding_year] = useState(0); //ปีงบประมาณ
  const [coordinater_funding_budget, setcoordinater_funding_budget] =
    useState(0); //งบประมาณ
  const [coordinater_funding_name, setcoordinater_funding_name] = useState(""); //ชื่อแหล่งทุน
  const [budget_id, setbudget_id] = useState(""); // ประเภทงบประมาณ
  const [coordinator_univercity_budget, setcoordinator_univercity_budget] =
    useState(""); //รายได้เข้ามหาลัย

  const [modalShowResearcher, setmodalShowResearcher] = React.useState(false);

  const [select_researchname, setselect_researchname] = useState("");
  // const [validated, setValidated] = useState(false);

  // const testid = props.location.stateid;
  const testitle = props.location.title;

  useEffect(() => {
    // props.getonefunding(testid);
    props.getSource_funds();
    props.getprojecttype();
    props.getyear();
    props.getresearch_faculty();
    props.getbudget_type();
    props.getfunding_status();
  }, []);

  const animatedComponents = makeAnimated();
  var research = [];

  for (const data of props.researchfaculty) {
    research.push({
      value: data.research_faculty_idcrad,
      label:
        data.research_faculty_username + " " + data.research_faculty_lastname,
    });
  }

  console.log("testfunding...", testitle);
  console.log("testfunding...222", props.funding.length);
  const CancleUpdate = () => {
    props.clearfunding().then(() => {
      props.history.push("/");
    });
  };

  const handleSubmit = () => {
    for (const data of select_researchname) {
      coordinater_funding_ac_research_team.push(data.value);
    }

    const newdata = {
      project_type_id,
      coordinater_funding_project_name,
      coordinator_project,
      coordinater_funding_agency,
      project_leader,
      coordinater_funding_phone,
      coordinater_funding_ac_research_team,
      coordinator_fundingagency_status_id,
      coordinater_funding_year,
      coordinater_funding_budget,
      coordinater_funding_name,
      budget_id,
      coordinator_univercity_budget,
    };

    if (props.funding) {
      console.log("testUpdate");
      props
        .updatefunding(props.funding.coordinater_funding_id, newdata)
        .then(() => {
          props.clearfunding();
          props.history.push("/");
        });
      console.log("testUpdate2");
    } else {
      console.log("testInsert");
      props.insertfunding(newdata).then(() => {
        alert("บันทึกข้อมูลสำเร็จ");
        props.clearfunding();
        props.history.push("/");
      });
    }
  };

  return (
    <React.Fragment>
      <div className="card-header">
        <div
          className="projcard-bar"
          style={{ marginLeft: "0", marginRight: "0" }}
        ></div>
      </div>

      <Form>
        {testitle ? (
          <h4 style={{ textAlign: "center" }}>{testitle}</h4>
        ) : (
          <h4 style={{ textAlign: "center" }}>เพิ่มข้อมูลแหล่งทุน งานวิจัย</h4>
        )}

        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body card-body-pading">
          <Row>
            {/* ประเภทแหล่งทุน */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>ประเภท</Form.Label>
                <select
                  required
                  className="form-control"
                  onChange={(event) => {
                    setproject_type_id(event.target.value);
                  }}
                >
                  {props.funding.length === 0 ? (
                    <option value="">เลือกประเภท</option>
                  ) : (
                    <option defaultValue={props.funding.project_type}>
                      {props.funding.project_type_name}
                    </option>
                  )}
                  {props.project_type.length > 0 ? (
                    <>
                      {props.project_type.map((value, i) => {
                        return (
                          <option key={i} value={value.project_type_id}>
                            {value.project_type_name}
                          </option>
                        );
                      })}
                    </>
                  ) : null}
                </select>
              </div>
            </Col>
            {/* ชื่อโครงการ */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>ชื่อโครงการ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  defaultValue={props.funding.coordinater_funding_project_name}
                  onChange={(event) => {
                    setcoordinater_funding_project_name(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* ผู้ประสานงานโครงการ */}
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>ผู้ประสานงานโครงการ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  defaultValue={props.funding.coordinator_project}
                  onChange={(event) => {
                    setcoordinator_project(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* หน่วยงานรับผิดชอบ */}
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>หน่วยงานรับผิดชอบ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  defaultValue={props.funding.coordinater_funding_agency}
                  required
                  onChange={(event) => {
                    setcoordinater_funding_agency(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* นักวิจัยผู้รับผิดสอบ */}
            <Col lg={8}>
              <div className="form-group">
                <Form.Label>นักวิจัยผู้รับผิดชอบ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  defaultValue={props.funding.project_leader}
                  onChange={(event) => {
                    setproject_leader(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* เบอร์ติดต่อ */}
            <Col lg={4}>
              <div className="form-group">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control
                  type="phone"
                  className="form-control"
                  defaultValue={props.funding.coordinater_funding_phone}
                  onChange={(event) => {
                    setcoordinater_funding_phone(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* ทีมนักวิจัย */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>ทีมนักวิจัย</Form.Label>
                <Select
                  closeMenuOnSelect={false}
                  name="select_research"
                  components={animatedComponents}
                  onChange={(selectedOptions) => {
                    setselect_researchname(selectedOptions);
                  }}
                  // defaultValue={[colourOptions[4], colourOptions[5]]}
                  isMulti
                  options={research}
                />
                <div>
                  <i
                    style={{ margin: "0.5rem", cursor: "pointer" }}
                    onClick={() => setmodalShowResearcher(true)}
                    className="fas fa-plus-circle"
                  >
                    {" "}
                    เพิ่มนักวิจัย
                  </i>
                </div>

                <Modal
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={modalShowResearcher}
                  onHide={() => setmodalShowResearcher(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      เพิ่มทีมนักวิจัย
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-group">
                      <Row>
                        <Col lg={6}>
                          <div className="form-group">
                            <label>ชื่อ</label>
                            <input
                              type="text"
                              name="project_Longitude"
                              className="form-control"
                              // onChange={(event) => {
                              //   setproject_Longitude(event.target.value);
                              // }}
                            />
                          </div>
                        </Col>
                        <Col lg={5}>
                          <div className="form-group">
                            <label>นามสกุล</label>
                            <input
                              type="text"
                              name="project_Longitude"
                              className="form-control"
                              // onChange={(event) => {
                              //   setproject_Longitude(event.target.value);
                              // }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "1rem" }}>
                        {/* <Col lg={1} /> */}
                        <Col lg={11}>
                          <label htmlFor="type_source">ตำแหน่งในโครงการ</label>
                          <input
                            type="text"
                            className="form-control"
                            // onChange={(event) => {
                            //   setSource_funds_name(event.target.value);
                            // }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      // href="/"
                      type="button"
                      onClick={() => setmodalShowResearcher(false)}
                    >
                      ยกเลิก
                    </Button>
                    <Button
                    // href="/addfunding"
                    // onClick={() => {
                    //   Axios.post(
                    //     "http://localhost:4000/api/create/source_funds",
                    //     {
                    //       source_funds_name: source_funds_name,
                    //       created_date: today,
                    //     }
                    //   );
                    //   setmodalShowResearcher(false);
                    // }}
                    >
                      บันทึก
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Col>
            {/* สถานะโครงการ */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>สถานะโครงการ :</Form.Label>
                <div className="form-control" style={{ border: "none" }}>
                  {props.fundingstatus.length > 0 ? (
                    <>
                      {props.fundingstatus.map(function (data, i) {
                        return (
                          <Form.Check
                            key={i}
                            style={{ marginLeft: "2rem" }}
                            inline
                            required
                            defaultValue={
                              props.coordinator_fundingagency_status_id
                            }
                            label={data.coordinator_fundingagency_status_name}
                            name="coordinator_fundingagency_status_id"
                            value={data.coordinator_fundingagency_status_id}
                            type="radio"
                            onChange={(event) => {
                              setcoordinator_fundingagency_status_id(
                                event.target.value
                              );
                            }}
                          />
                        );
                      })}
                    </>
                  ) : null}

                  <Form.Control.Feedback type="invalid">
                    <h6 style={{ marginTop: "0.7rem" }}>
                      ** โปรดกรอกประเภทงบประมาณ
                    </h6>
                  </Form.Control.Feedback>
                </div>
              </div>
            </Col>
          </Row>

          <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
          <Row>
            {/* ปีงบประมาณ */}
            <Col lg={5}>
              <div className="form-group">
                <Form.Label>ปีงบประมาณ</Form.Label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    setcoordinater_funding_year(event.target.value);
                  }}
                >
                  {props.funding.length === 0 ? (
                    <option value="">เลือกปี</option>
                  ) : (
                    <option
                      defaultValue={props.funding.coordinater_funding_year}
                    >
                      {props.funding.coordinater_funding_year}
                    </option>
                  )}

                  {props.year.map((value, i) => {
                    return (
                      <option key={i} value={value.value}>
                        {value.value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Col>
            {/* งบประมาณที่ได้รับ */}
            <Col lg={7}>
              <div className="form-group">
                <Form.Label>งบประมาณที่ได้รับ</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  defaultValue={props.funding.coordinater_funding_budget}
                  onChange={(event) => {
                    setcoordinater_funding_budget(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* ชื่อแหล่งทุน */}
            <Col lg={7}>
              <div className="form-group">
                <Form.Label>ชื่อแหล่งทุน</Form.Label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    setcoordinater_funding_name(event.target.value);
                  }}
                >
                  {props.funding.length === 0 ? (
                    <option value="">เลือกแหล่งทุน</option>
                  ) : (
                    <option defaultValue={props.funding.coordinator_source_id}>
                      {props.funding.source_funds_name}
                    </option>
                  )}

                  {props.source_funds.length > 0 ? (
                    <>
                      {props.source_funds.map((value, i) => {
                        return (
                          <option key={i} value={value.source_funds_id}>
                            {value.source_funds_name}
                          </option>
                        );
                      })}
                    </>
                  ) : null}
                </select>

                <div>
                  <NavLink
                    to="/addfunding/aboutfunding"
                    style={{ color: "#000", fontSize: "14px" }}
                  >
                    <i
                      style={{ margin: "0.5rem", cursor: "pointer" }}
                      className="fas fa-plus-circle"
                      // onClick={() => setModalShow(true)}
                    >
                      {" "}
                      เพิ่มแหล่งทุน
                    </i>
                  </NavLink>
                </div>
              </div>
            </Col>
            {/* ประเภทงบประมาณ */}
            <Col lg={5}>
              <div className="form-group">
                <Form.Label>ประเภทงบประมาณ</Form.Label>
                <select
                  required
                  className="form-control"
                  onChange={(event) => {
                    setbudget_id(event.target.value);
                  }}
                >
                  {props.funding.length === 0 ? (
                    <option value="">เลือกประเภทงบประมาณ</option>
                  ) : (
                    <option defaultValue={props.funding.budget_id}>
                      {props.funding.coordinator_Budget_type_name}
                    </option>
                  )}

                  {props.budgettype.length > 0 ? (
                    <>
                      {props.budgettype.map((value, i) => {
                        return (
                          <option
                            key={i}
                            value={value.coordinator_Budget_type_id}
                          >
                            {value.coordinator_Budget_type_name}
                          </option>
                        );
                      })}
                    </>
                  ) : null}
                </select>
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกประเภทงบประมาณ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* รายได้เข้ามหาลัย */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>รายได้เข้ามหาลัย</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  defaultValue={props.funding.coordinator_univercity_budget}
                  required
                  onChange={(event) => {
                    setcoordinator_univercity_budget(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกรายได้เข้ามหาลัย
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
          </Row>
        </div>
        <div
          className="card-footer"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          {props.funding.length === 0 ? (
            <Row>
              <Col>
                <div className="center">
                  <Button
                    onClick={handleSubmit}
                    // type="submit"
                    // href="/"
                    className="btn bg-gradient-primary btn-md"
                  >
                    บันทึก
                  </Button>
                </div>
              </Col>
            </Row>
          ) : (
            <Row style={{ padding: "0 5rem" }}>
              <Col lg={6} style={{ float: "left" }}>
                <Button
                  onClick={CancleUpdate}
                  className="btn bg-gradient-primary btn-md"
                >
                  ยกเลิก
                </Button>
              </Col>
              <Col lg={6} style={{ textAlign: "right" }}>
                <Button
                  onClick={handleSubmit}
                  className="btn bg-gradient-primary btn-md"
                >
                  บันทึก
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </Form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    researchfaculty: state.funding.researchfaculty,
    budgettype: state.funding.budgettype,
    fundingstatus: state.funding.fundingstatus,
    year: state.concept.year,
    concept: state.concept.concept,
    user: state.concept.user,
    source_funds: state.concept.sourcefund,
    project_type: state.concept.projecttype,
    funding: state.funding.getonefunding,
  };
};

export default connect(mapStateToProps, {
  getUser,
  getSource_funds,
  getprojecttype,
  getyear,
  getresearch_faculty,
  getbudget_type,
  // getonefunding,
  getfunding_status,
  insertfunding,
  updatefunding,
  clearfunding,
})(withRouter(AddFundingResearch));
