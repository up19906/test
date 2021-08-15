/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import {
  getUser,
  getSource_funds,
  getprojecttype,
  getyear,
  addsubconcept,
} from "../../../redux/conceptProposal/action";
function AddConceptproposal(props) {
  const [project_type_id, setproject_type_id] = useState(""); //ประเภท
  const [concept_proposal_name, setconcept_proposal_name] = useState(""); //ชื่อโครงการ
  const [source_funds_id, setsource_funds_id] = useState(""); //แหล่งทุน
  const [concept_budget, setconcept_budget] = useState(""); //งบประมาณที่ได้รับ
  const [concept_year, setconcept_year] = useState(""); //ปี
  const [concept_phone, setconcept_phone] = useState(""); //เบอร์ติดต่อ
  const [select_researchname, setselect_researchname] = useState(""); //หัวหน้าแผน
  const concept_proposal_type = 2; //สถานะโครงการ
  const [concept_univercity_budget, setconcept_univercity_budget] = useState(0); //รายได้เข้ามหาลัย
  // const [validated, setValidated] = useState(false);
  const [countsubconcept, setcountsubconcept] = useState(0);
  const [gotopage, setgotopage] = useState(false);

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
  const handleSubmit = () => {
    const concept_leader = select_researchname.value;
    // const concept_proposal_type = 0;
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
    props.addsubconcept(data);
    setcountsubconcept(countsubconcept + 1);

    if (gotopage === true) {
      props.history.push("/research/studyarea");
      console.log("test 1");
    }
  };
  console.log("testconcept ", props.subconcept);

  const poject_type_int = parseInt(props.concept.project_type_id);
  console.log(" project Id : ", poject_type_int);

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body card-body-pading">
          <h5 style={{ textAlign: "left" }}>โครงการย่อย</h5>
        </div>
        <div className="card-body card-body-pading">
          <Row>
            {/* ประเภท */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>ประเภท</Form.Label>
                {/* <Form.Control required> */}
                <select
                  className="form-control"
                  // name="project_type_id"

                  onChange={(event) => {
                    setproject_type_id(event.target.value);
                  }}
                >
                  <option value="">เลือกประเภท</option>
                  {/* {
                    props.subconcept.length === 0 ? (
                      <option value="">เลือกประเภท</option>
                    ) : null
                    // (
                    //   <option value={props.concept.project_type_id}>
                    //     {props.project_type[poject_type_int].project_type_name}
                    //   </option>
                    // )
                  } */}

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
                {/* </Form.Control> */}
              </div>
            </Col>
            {/* ชื่อโครงการ */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>ชื่อโครงการ</Form.Label>
                <Form.Control
                  type="text"
                  // name="concept_proposal_name"
                  // defaultValue={props.concept.concept_proposal_name}
                  className="form-control"
                  onChange={(event) => {
                    setconcept_proposal_name(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* แหล่งทุน */}
            <Col lg={8}>
              <div className="form-group">
                <Form.Label>แหล่งทุน</Form.Label>
                <select
                  className="form-control"
                  // name="project_funding"

                  onChange={(event) => {
                    setsource_funds_id(event.target.value);
                  }}
                >
                  <option value="">เลือกแหล่งทุน</option>
                  {/* {
                    props.subconcept.length === 0 ? (
                      <option value="">เลือกแหล่งทุน</option>
                    ) : null
                    // <option value={props.concept.source_funds_id}>
                    //   {
                    //     props.source_funds[props.concept.source_funds_id]
                    //       .source_funds_name
                    //   }
                    // </option>
                  } */}

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
              </div>
            </Col>
            {/* ปีงบประมาณ */}
            <Col lg={4}>
              <div className="form-group">
                <Form.Label>ปีงบประมาณ</Form.Label>
                <select
                  className="form-control"
                  // name="concept_year"

                  onChange={(event) => {
                    setconcept_year(event.target.value);
                  }}
                >
                  <option value="">เลือกปีงบประมาณ </option>
                  {/* {
                    props.subconcept.length === 0 ? (
                      <option value="">เลือกปีงบประมาณ </option>
                    ) : null
                    // <option value={props.concept.source_funds_id}>
                    //   {
                    //     props.source_funds[props.concept.source_funds_id]
                    //       .source_funds_name
                    //   }
                    // </option>
                  } */}
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
              </div>
            </Col>
            {/* งบประมาณที่ได้รับ */}
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>งบประมาณที่ได้รับ</Form.Label>
                <Form.Control
                  type="number"
                  // defaultValue={props.concept.concept_budget}
                  // name="concept_budget"
                  className="form-control"
                  onChange={(event) => {
                    setconcept_budget(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* รายได้เข้ามหาลัย */}
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>รายได้เข้ามหาลัย</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  // defaultValue={props.concept.concept_univercity_budget}
                  onChange={(event) => {
                    setconcept_univercity_budget(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* หัวหน้าแผน */}
            <Col lg={7}>
              <div className="form-group">
                <Form.Label>หัวหน้าแผน</Form.Label>
                <Select
                  // defaultValue={{ label: props.concept.leader_name }}
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
                  // name="concept_phone"
                  // defaultValue={props.concept.concept_phone}
                  className="form-control"
                  onChange={(event) => {
                    setconcept_phone(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* 
            {countsubconcept === 0 ? (
             
            ) : null} */}
          </Row>

          <div>
            {[...Array(countsubconcept)].map(function (data, index) {
              return (
                <Form key={index}>
                  <div
                    className="projcard-bar"
                    style={{ margin: "1.5rem 5rem" }}
                  ></div>
                  <div className="card-body ">
                    <Row>
                      <Col>
                        <h5 style={{ textAlign: "left" }}>
                          โครงการย่อย {index + 2}
                        </h5>
                      </Col>
                      <Col>
                        <div style={{ textAlign: "right" }}>
                          <i
                            style={{
                              margin: "0.5rem",
                              cursor: "pointer",
                            }}
                            className="fas fa-minus-circle"
                            onClick={() =>
                              setcountsubconcept(countsubconcept - 1)
                            }
                          >
                            {" "}
                            ลบโครงการย่อย{index + 2}
                          </i>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    {/* ประเภท */}
                    <Col lg={12}>
                      <div className="form-group">
                        <Form.Label>ประเภท</Form.Label>
                        {/* <Form.Control required> */}
                        <select
                          className="form-control"
                          // name="project_type_id"

                          onChange={(event) => {
                            setproject_type_id(event.target.value);
                          }}
                        >
                          <option value="">เลือกประเภท</option>
                          {/* {
                            props.concept.project_type_id === null ? (
                              <option value="">เลือกประเภท</option>
                            ) : null
                            // (
                            //   <option value={props.concept.project_type_id}>
                            //     {props.project_type[poject_type_int].project_type_name}
                            //   </option>
                            // )
                          } */}

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
                        {/* </Form.Control> */}
                      </div>
                    </Col>
                    {/* ชื่อโครงการ */}
                    <Col lg={12}>
                      <div className="form-group">
                        <Form.Label>ชื่อโครงการ</Form.Label>
                        <Form.Control
                          type="text"
                          // name="concept_proposal_name"
                          // defaultValue={props.concept.concept_proposal_name}
                          className="form-control"
                          onChange={(event) => {
                            setconcept_proposal_name(event.target.value);
                          }}
                        />
                      </div>
                    </Col>
                    {/* แหล่งทุน */}
                    <Col lg={8}>
                      <div className="form-group">
                        <Form.Label>แหล่งทุน</Form.Label>
                        <select
                          className="form-control"
                          // name="project_funding"

                          onChange={(event) => {
                            setsource_funds_id(event.target.value);
                          }}
                        >
                          <option value="">เลือกแหล่งทุน</option>
                          {/* {
                            props.concept.source_funds_id === null ? (
                              <option value="">เลือกแหล่งทุน</option>
                            ) : null
                            // <option value={props.concept.source_funds_id}>
                            //   {
                            //     props.source_funds[props.concept.source_funds_id]
                            //       .source_funds_name
                            //   }
                            // </option>
                          } */}

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
                      </div>
                    </Col>
                    {/* ปีงบประมาณ */}
                    <Col lg={4}>
                      <div className="form-group">
                        <Form.Label>ปีงบประมาณ</Form.Label>
                        <select
                          className="form-control"
                          // name="concept_year"

                          onChange={(event) => {
                            setconcept_year(event.target.value);
                          }}
                        >
                          <option value="">เลือกปี</option>
                          {/* <option value={props.concept.concept_year}>
                            {props.concept.concept_year}
                          </option> */}
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
                      </div>
                    </Col>
                    {/* งบประมาณที่ได้รับ */}
                    <Col lg={6}>
                      <div className="form-group">
                        <Form.Label>งบประมาณที่ได้รับ</Form.Label>
                        <Form.Control
                          type="number"
                          // defaultValue={props.concept.concept_budget}
                          // name="concept_budget"
                          className="form-control"
                          onChange={(event) => {
                            setconcept_budget(event.target.value);
                          }}
                        />
                      </div>
                    </Col>
                    {/* รายได้เข้ามหาลัย */}
                    <Col lg={6}>
                      <div className="form-group">
                        <Form.Label>รายได้เข้ามหาลัย</Form.Label>
                        <Form.Control
                          type="number"
                          className="form-control"
                          // defaultValue={props.concept.concept_univercity_budget}
                          onChange={(event) => {
                            setconcept_univercity_budget(event.target.value);
                          }}
                        />
                      </div>
                    </Col>
                    {/* หัวหน้าแผน */}
                    <Col lg={7}>
                      <div className="form-group">
                        <Form.Label>หัวหน้าแผน</Form.Label>
                        <Select
                          // defaultValue={{ label: props.concept.leader_name }}
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
                          // name="concept_phone"
                          // defaultValue={props.concept.concept_phone}
                          className="form-control"
                          onChange={(event) => {
                            setconcept_phone(event.target.value);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Form>
              );
            })}
          </div>
          <Col lg={4}>
            <div>
              <i
                style={{ margin: "0.5rem", cursor: "pointer" }}
                className="fas fa-plus-circle"
                onClick={handleSubmit}
              >
                {" "}
                เพิ่มโครงการย่อย
              </i>
            </div>
          </Col>
        </div>

        <div
          className="card-footer"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <Row style={{ padding: "0 5rem" }}>
            <Col lg={6} style={{ float: "left" }}>
              <NavLink
                className="btn bg-gradient-primary btn-md"
                to="/research"
              >
                ย้อนกลับ
              </NavLink>

              {/* </Button> */}
            </Col>
            <Col lg={6} style={{ textAlign: "right" }}>
              <Button
                onClick={() => setgotopage(true)}
                type="submit"
                className="btn bg-gradient-primary btn-md"
              >
                ถัดไป
              </Button>
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
    subconcept: state.concept.subconcept,
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
  addsubconcept,
})(AddConceptproposal);
