/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState, createRef } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";
import { connect } from "react-redux";

import { addconcept } from "../../../redux/conceptProposal/action";
import { data } from "jquery";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";

function AddConceptproposal(props) {
  var date = new Date();
  var today =
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-") +
    " " +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
  console.log("testdate:string", today);
  const year = [
    { value: [date.getFullYear() + 544] },
    { value: [date.getFullYear() + 543] },
    { value: [date.getFullYear() + 542] },
    { value: [date.getFullYear() + 541] },
    { value: [date.getFullYear() + 540] },
    { value: [date.getFullYear() + 539] },
  ];
  const form = createRef();

  const [about_finding, setabout_finding] = useState([]);
  const [selectProjectType, setselectProjectType] = useState(""); //ประเภท
  const [project_name, setproject_name] = useState(""); //ชื่อโครงการ
  const [selectSourceFunds, setselectSourceFunds] = useState(""); //แหล่งทุน
  const [project_budget, setproject_budget] = useState(""); //งบประมาณที่ได้รับ
  const [project_star, setproject_star] = useState(""); //ปี
  const [project_agency, setproject_agency] = useState(""); //หน่วยงานเจ้าของโครงการ

  // const [create_date, setCreate_date] = useState("");
  const [project_status, setproject_status] = useState(""); //สถานะโครงการ

  const [validated, setValidated] = useState(false);
  // const [showtableResearcher, setshowtableResearcher] = React.useState(false);
  //   const [source_funds_name, setsource_funds_name] = useState("");
  // const [fname, setfname] = useState(null);
  // const [lname, setlname] = useState(null);
  // const [idcard, setidcard] = useState(null);

  const [source_funds, setSource_fund] = useState([]);
  const [project_type, setproject_type] = useState([]);
  const [status_type, setstatus_type] = useState([]);
  // const [select_researchname, setselect_researchname] = useState("");
  const [research, setresearch] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/source_funds").then((source) => {
      setSource_fund(source.data);
    });
    Axios.get(
      "http://localhost:4000/api/get/concept_proposal_research_facultys"
    ).then((res) => {
      setresearch(res.data);
      console.log("research : ", research);
    });
    Axios.get("http://localhost:4000/api/get/project-type").then((resp) => {
      // console.log(resp.data);
      setproject_type(resp.data);
    });
    Axios.get(
      "http://localhost:4000/api/get/coordinator_fundingagency_status"
    ).then((res) => {
      setstatus_type(res.data);
      console.log("setstatus_type : ", status_type);
    });
  }, []);

  // const researcher = (selectedOptions) => {
  //   setselect_researchname(selectedOptions);
  //   for (let i = 0; i < select_researchname.length; i = i + 1) {
  //     select_research.push(select_researchname[i].value);
  //   }
  // };
  // const animatedComponents = makeAnimated();
  var test = [];
  for (let i = 0; i < research.length; i = i + 1) {
    test.push({
      value: research[i].research_faculty_idcrad,
      label:
        research[i].research_faculty_username +
        " " +
        research[i].research_faculty_lastname,
    });
  }

  const handleSubmit = () => {
    props
      .addconcept(
        selectProjectType,
        project_name,
        selectSourceFunds,
        project_budget,
        project_star,
        project_agency,
        project_status
      )
      .then((data) => {
        setabout_finding([
          ...about_finding,
          {
            selectProjectType: data.selectProjectType,
            project_name: data.project_name,
            selectSourceFunds: data.selectSourceFunds,
            project_budget: data.project_budget,
            project_star: data.project_star,
            project_agency: data.project_agency,
            project_status: data.project_status,
            // file: file,
            // created_date: today,
          },
        ]);
      });

    // event.preventDefault();
    // const forms = event.currentTarget;
    // if (forms.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   setValidated(true);
    //   console.log("checkValidity : true :", validated);
    // } else {
    //   // console.log("checkValidity : false :", validated);
    //   const dataArray = new FormData(form.current);
    //   // console.log("data:", dataArray);
    //   Axios.post(
    //     "http://localhost:4000/api/post/coordinator_fundingagency_project",
    //     dataArray
    //   )
    //     .then(() => {
    //       alert("บันทึกข้อมูลสำเร็จ!!");
    //       // console.log(res.data.massage);
    //       // alert(res.data.massage);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //   setabout_finding([
    //     ...about_finding,
    //     {
    //       selectProjectType: selectProjectType,
    //       project_name: project_name,
    //       selectSourceFunds: selectSourceFunds,
    //       project_budget: project_budget,
    //       project_star: project_star,
    //       project_agency: project_agency,
    //       project_latitude: project_latitude,
    //       project_Longitude: project_Longitude,
    //       project_status: project_status,
    //       file: file,
    //       // created_date: today,
    //     },
    //   ]);
    // }
  };

  console.log("testconcept ", props.concept);
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
                  className="form-control"
                  name="project_type"
                  required
                  onChange={(event) => {
                    setselectProjectType(event.target.value);
                  }}
                >
                  <option value="">เลือกประเภท</option>
                  {project_type.map((value, i) => {
                    return (
                      <option key={i} value={value.project_type_name}>
                        {value.project_type_name}
                      </option>
                    );
                  })}
                </select>
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>** โปรดกรอกประเภท</h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* ชื่อโครงการ */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>ชื่อโครงการ</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="project_name"
                  className="form-control"
                  onChange={(event) => {
                    setproject_name(event.target.value);
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
                  name="project_funding"
                  required
                  onChange={(event) => {
                    setselectSourceFunds(event.target.value);
                  }}
                >
                  <option value="">เลือกแหล่งทุน</option>
                  {source_funds.map((value, i) => {
                    return (
                      <option key={i} value={value.source_funds_name}>
                        {value.source_funds_name}
                      </option>
                    );
                  })}
                </select>
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>** โปรดกรอกแหล่งทุน</h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* ปีงบประมาณ */}
            <Col lg={4}>
              <div className="form-group">
                <Form.Label>ปีงบประมาณ</Form.Label>
                <select
                  className="form-control"
                  name="project_star"
                  required
                  onChange={(event) => {
                    setproject_star(event.target.value);
                  }}
                >
                  <option value="">เลือกปี</option>
                  {year.map((value, i) => {
                    return (
                      <option key={i} value={value.value}>
                        {value.value}
                      </option>
                    );
                  })}
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
                  name="project_budget"
                  className="form-control"
                  onChange={(event) => {
                    setproject_budget(event.target.value);
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
                  required
                  // onChange={(event) => {
                  //   setcoordinator_univercity_budget(event.target.value);
                  // }}
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
                <Form.Control
                  type="text"
                  required
                  name="project_agency"
                  className="form-control"
                  onChange={(event) => {
                    setproject_agency(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกหน่วยงานเจ้าของโครงการ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* เบอร์ติดต่อ */}
            <Col lg={5}>
              <div className="form-group">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="project_agency"
                  className="form-control"
                  onChange={(event) => {
                    setproject_agency(event.target.value);
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
                    name="project_status"
                    value="0"
                    type="radio"
                    onChange={(event) => {
                      setproject_status(event.target.value);
                    }}
                  />
                  <Form.Check
                    style={{ marginLeft: "2rem" }}
                    inline
                    required
                    label="โครงการชุด"
                    name="project_status"
                    value="1"
                    type="radio"
                    onChange={(event) => {
                      setproject_status(event.target.value);
                    }}
                  />
                  {/* {status_type.map(function (data, i) {
                    return (
                      <Form.Check
                        key={i}
                        style={{ marginLeft: "2rem" }}
                        inline
                        required
                        label={data.coordinator_fundingagency_status_name}
                        name="project_status"
                        value={data.coordinator_fundingagency_status_id}
                        type="radio"
                        onChange={(event) => {
                          setproject_status(event.target.value);
                        }}
                      />
                    );
                  })} */}
                  <Form.Control.Feedback type="invalid">
                    <h6 style={{ marginTop: "0.7rem" }}>
                      ** โปรดกรอกสถานะโครงการ
                    </h6>
                  </Form.Control.Feedback>
                </div>
              </div>
            </Col>

            {project_status === "1" ? (
              <Row>
                <Col lg={12} style={{ textAlign: "center" }}>
                  <div
                    className="projcard-bar"
                    style={{
                      marginLeft: "8rem",
                      marginRight: "5rem",
                      marginBottom: "1.25rem",
                    }}
                  ></div>
                  <h4>โครงการย่อย</h4>
                </Col>
                {/* ประเภท */}
                <Col lg={12}>
                  <div className="form-group">
                    <Form.Label>ประเภท</Form.Label>
                    <select
                      className="form-control"
                      name="project_type"
                      required
                      onChange={(event) => {
                        setselectProjectType(event.target.value);
                      }}
                    >
                      <option value="">เลือกประเภท</option>
                      {project_type.map((value, i) => {
                        return (
                          <option key={i} value={value.project_type_name}>
                            {value.project_type_name}
                          </option>
                        );
                      })}
                    </select>
                    <Form.Control.Feedback type="invalid">
                      <h6 style={{ marginTop: "0.7rem" }}>** โปรดกรอกประเภท</h6>
                    </Form.Control.Feedback>
                  </div>
                </Col>
                {/* ชื่อโครงการ */}
                <Col lg={12}>
                  <div className="form-group">
                    <Form.Label>ชื่อโครงการ</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="project_name"
                      className="form-control"
                      onChange={(event) => {
                        setproject_name(event.target.value);
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
                      name="project_funding"
                      required
                      onChange={(event) => {
                        setselectSourceFunds(event.target.value);
                      }}
                    >
                      <option value="">เลือกแหล่งทุน</option>
                      {source_funds.map((value, i) => {
                        return (
                          <option key={i} value={value.source_funds_name}>
                            {value.source_funds_name}
                          </option>
                        );
                      })}
                    </select>
                    <Form.Control.Feedback type="invalid">
                      <h6 style={{ marginTop: "0.7rem" }}>
                        ** โปรดกรอกแหล่งทุน
                      </h6>
                    </Form.Control.Feedback>
                  </div>
                </Col>
                {/* ปีงบประมาณ */}
                <Col lg={4}>
                  <div className="form-group">
                    <Form.Label>ปีงบประมาณ</Form.Label>
                    <select
                      className="form-control"
                      name="project_star"
                      required
                      onChange={(event) => {
                        setproject_star(event.target.value);
                      }}
                    >
                      <option value="">เลือกปี</option>
                      {year.map((value, i) => {
                        return (
                          <option key={i} value={value.value}>
                            {value.value}
                          </option>
                        );
                      })}
                    </select>
                    <Form.Control.Feedback type="invalid">
                      <h6 style={{ marginTop: "0.7rem" }}>
                        ** โปรดกรอกปีงบประมาณ
                      </h6>
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
                      name="project_budget"
                      className="form-control"
                      onChange={(event) => {
                        setproject_budget(event.target.value);
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
                      required
                      // onChange={(event) => {
                      //   setcoordinator_univercity_budget(event.target.value);
                      // }}
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
                    <Form.Control
                      type="text"
                      required
                      name="project_agency"
                      className="form-control"
                      onChange={(event) => {
                        setproject_agency(event.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      <h6 style={{ marginTop: "0.7rem" }}>
                        ** โปรดกรอกหน่วยงานเจ้าของโครงการ
                      </h6>
                    </Form.Control.Feedback>
                  </div>
                </Col>
                {/* เบอร์ติดต่อ */}
                <Col lg={5}>
                  <div className="form-group">
                    <Form.Label>เบอร์ติดต่อ</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="project_agency"
                      className="form-control"
                      onChange={(event) => {
                        setproject_agency(event.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      <h6 style={{ marginTop: "0.7rem" }}>
                        ** โปรดกรอกหน่วยงานเจ้าของโครงการ
                      </h6>
                    </Form.Control.Feedback>
                  </div>
                </Col>
              </Row>
            ) : null}
          </Row>
        </div>
        <div
          className="card-footer"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <Row>
            <Col>
              <div className="center">
                <NavLink to="/research/studyarea">
                  <Button
                    // onClick={handleSubmit}
                    // href="/"
                    type="submit"
                    className="btn bg-gradient-primary btn-md"
                  >
                    ถัดไป
                  </Button>
                </NavLink>
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
  };
};
const mapDispatchToProps = (dispatch) => ({
  addconcept: (
    selectProjectType,
    project_name,
    selectSourceFunds,
    project_budget,
    project_star,
    project_agency,
    project_status
  ) =>
    dispatch(
      addconcept(
        selectProjectType,
        project_name,
        selectSourceFunds,
        project_budget,
        project_star,
        project_agency,
        project_status
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddConceptproposal);
