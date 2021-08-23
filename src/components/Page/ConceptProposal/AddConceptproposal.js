/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState, createRef } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { NavLink} from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import {
  getUser,
  getSource_funds,
  getprojecttype,
  getyear,
  addconcept,
} from "../../../redux/conceptProposal/action";

function AddConceptproposal(props) {
  const form = createRef();
  const [project_type_id, setproject_type_id] = useState(""); //ประเภท
  const [concept_proposal_name, setconcept_proposal_name] = useState(""); //ชื่อโครงการ
  const [source_funds_id, setsource_funds_id] = useState(""); //แหล่งทุน
  const [concept_budget, setconcept_budget] = useState(""); //งบประมาณที่ได้รับ
  const [concept_year, setconcept_year] = useState(""); //ปี
  const [concept_phone, setconcept_phone] = useState(""); //เบอร์ติดต่อ
  const [select_researchname, setselect_researchname] = useState("");
  const [concept_proposal_type, setconcept_proposal_type] = useState("0"); //สถานะโครงการ
  const [concept_univercity_budget, setconcept_univercity_budget] = useState(0);
  const [validated, setValidated] = useState(false);

  console.log("test.1", props.user);
  console.log("test.2", props.source_funds);
  console.log("test.3", props.project_type);
  useEffect(() => {
    props.getUser();
    props.getSource_funds();
    props.getprojecttype();
    props.getyear();
  }, []);

  const animatedComponents = makeAnimated();
  const researcher = [];

  for (const data of props.user) {
    researcher.push({
      value: data.user_idcard,
      label: data.user_first_name_th + " " + data.user_last_name_th,
    });
  }

  const handleSubmit = (event) => {
    const concept_leader = select_researchname.value;
    const concpt_proposal_sub = "";
    const data = {
      concpt_proposal_sub,
      project_type_id,
      concept_proposal_name,
      source_funds_id,
      concept_year,
      concept_budget,
      concept_univercity_budget,
      concept_leader,
      concept_phone,
      concept_proposal_type,
    };
    props.addconcept(data);
    console.log("test 1");
    if (concept_proposal_type === "0") {
      props.history.push("/conceptproposal/studyarea");
    } else if (concept_proposal_type === "1") {
      props.history.push("/conceptproposal/addsubconcept");
    }
  };
  console.log("testconcept ", props.concept);
  const poject_type_int = parseInt(props.concept.project_type_id);
  console.log(" project Id : ", poject_type_int);

  return (
    <React.Fragment>
      <Form ref={form} noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body card-body-pading">
          <Row>
            {/* ประเภท */}
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
                  {
                    props.concept.length === 0 ? (
                      <option value="">เลือกประเภท</option>
                    ) : null
                    // <option value={props.concept.project_type_id}>
                    //   {
                    //     props.project_type[
                    //       parseInt(props.concept.project_type_id)
                    //     ].project_type_name
                    //   }
                    // </option>
                  }
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
                  required
                  // name="concept_proposal_name"
                  defaultValue={props.concept.concept_proposal_name}
                  className="form-control"
                  onChange={(event) => {
                    setconcept_proposal_name(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกชื่อโครงการ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* แหล่งทุน */}
            <Col lg={8}>
              <div className="form-group">
                <Form.Label>แหล่งทุน</Form.Label>
                <select
                  className="form-control"
                  // name="project_funding"
                  required
                  onChange={(event) => {
                    setsource_funds_id(event.target.value);
                  }}
                >
                  {
                    props.concept.length === 0 ? (
                      <option value="">เลือกแหล่งทุน</option>
                    ) : null
                    // <option value={props.concept.source_funds_id}>
                    //   {
                    //     props.source_funds[props.concept.source_funds_id]
                    //       .source_funds_name
                    //   }
                    // </option>
                  }

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
            {/* ปีงบประมาณ */}
            <Col lg={4}>
              <div className="form-group">
                <Form.Label>ปีงบประมาณ</Form.Label>
                <select
                  className="form-control"
                  // name="concept_year"
                  required
                  onChange={(event) => {
                    setconcept_year(event.target.value);
                  }}
                >
                  {
                    props.concept.length === 0 ? (
                      <option value="">เลือกปีงบประมาณ</option>
                    ) : null
                    // <option value={props.concept.source_funds_id}>
                    //   {
                    //     props.source_funds[props.concept.source_funds_id]
                    //       .source_funds_name
                    //   }
                    // </option>
                  }
                  {props.year.length > 0 ? (
                    <>
                      {props.year.map((value, i) => {
                        return (
                          <option key={i} value={value.value}>
                            {value.value}
                          </option>
                        );
                      })}
                    </>
                  ) : null}
                </select>
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>** โปรดกรอกปีงบประมาณ</h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* งบประมาณที่ได้รับ */}
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>งบประมาณที่ได้รับ</Form.Label>
                <Form.Control
                  type="number"
                  required
                  defaultValue={props.concept.concept_budget}
                  // name="concept_budget"
                  className="form-control"
                  onChange={(event) => {
                    setconcept_budget(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกงบประมาณที่ได้รับ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* รายได้เข้ามหาลัย */}
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>รายได้เข้ามหาลัย</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  defaultValue={props.concept.concept_univercity_budget}
                  required
                  onChange={(event) => {
                    setconcept_univercity_budget(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกรายได้เข้ามหาลัย
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* หัวหน้าแผน */}
            <Col lg={7}>
              <div className="form-group">
                <Form.Label>หัวหน้าแผน</Form.Label>
                <Select
                  defaultValue={{ label: props.concept.leader_name }}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  onChange={(selectedOptions) => {
                    setselect_researchname(selectedOptions);
                  }}
                  // defaultValue={[colourOptions[4], colourOptions[5]]}
                  options={researcher}
                />
              </div>
            </Col>
            {/* เบอร์ติดต่อ */}
            <Col lg={5}>
              <div className="form-group">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control
                  type="text"
                  required
                  // name="concept_phone"
                  defaultValue={props.concept.concept_phone}
                  className="form-control"
                  onChange={(event) => {
                    setconcept_phone(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกหน่วยงานเจ้าของโครงการ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* สถานะโครงการ */}
            <Col lg={12}>
              <div className="form-group">
                <div
                  className=""
                  style={{ border: "none", marginTop: "0.5rem" }}
                >
                  <Form.Label>สถานะโครงการ :</Form.Label>
                  <Form.Check
                    style={{ marginLeft: "2rem" }}
                    inline
                    required
                    label="โครงการเดี่ยว"
                    name="concept_proposal_type"
                    // defaultChecked={check1}
                    value="0"
                    type="radio"
                    onChange={(event) => {
                      setconcept_proposal_type(event.target.value);
                    }}
                  />
                  <Form.Check
                    style={{ marginLeft: "2rem" }}
                    inline
                    required
                    label="โครงการชุด"
                    name="concept_proposal_type"
                    value="1"
                    // defaultChecked={check2}
                    type="radio"
                    onChange={(event) => {
                      setconcept_proposal_type(event.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    <h6 style={{ marginTop: "0.7rem" }}>
                      ** โปรดกรอกสถานะโครงการ
                    </h6>
                  </Form.Control.Feedback>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div
          className="card-footer"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <Row>
            <Col>
              <div className="center">
                <Button
                  type="submit"
                  className="btn bg-gradient-primary btn-md"
                >
                  ถัดไป
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    concept: state.concept.concept,
    user: state.concept.user,
    source_funds: state.concept.sourcefund,
    project_type: state.concept.projecttype,
    year: state.concept.year,
  };
};

export default connect(mapStateToProps, {
  getUser,
  getSource_funds,
  getprojecttype,
  getyear,
  addconcept,
})(AddConceptproposal);
