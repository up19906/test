/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";

import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function AddFundingResearch() {
  var date = new Date();
  const year = [
    { value: [date.getFullYear() + 544] },
    { value: [date.getFullYear() + 543] },
    { value: [date.getFullYear() + 542] },
    { value: [date.getFullYear() + 541] },
    { value: [date.getFullYear() + 540] },
    { value: [date.getFullYear() + 539] },
  ];
  const [funding_research, setFunding_research] = useState([]);
  const [funding_project_name, setFunding_project_name] = useState(""); //ชื่อโครงการ
  const [coordinator_project, setCoordinator_project] = useState(""); //ผู้ประสานงาน
  const [funding_agency, setFunding_agency] = useState(""); //หน่วยงานที่รับผิดชอบ
  const [funding_project_leader, setFunding_project_leader] = useState(""); //นักวิจัยผู้รับผิดชอบ
  const [funding_phone, setFunding_phone] = useState(0); //เบอร์ติดต่อ
  var select_research = []; //เลือกทีมนักวิจัย
  const [project_status, setproject_status] = useState(""); //สถานะโครงการ
  const [funding_year, setFunding_year] = useState(0); //ปีงบประมาณ
  const [funding_budget, setFunding_budget] = useState(0); //งบประมาณ
  const [funding_name, setFunding_name] = useState(""); //ชื่อแหล่งทุน
  const [funding_type, setfunding_type] = useState(""); // ประเภทงบประมาณ
  const [coordinator_univercity_budget, setcoordinator_univercity_budget] =
    useState(""); //รายได้เข้ามหาลัย

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowResearcher, setmodalShowResearcher] = React.useState(false);
  const [source_funds_name, setSource_funds_name] = useState("");
  const [select_researchname, setselect_researchname] = useState("");

  const [source_funds, setSource_fund] = useState([]);
  const [status_type, setstatus_type] = useState([]);
  const [research, setresearch] = useState([]);
  const [budget_type, setbudget_type] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/source_funds").then((source) => {
      setSource_fund(source.data);
      console.log("source_funds_name : ", source_funds);
    });
    Axios.get(
      "http://localhost:4000/api/get/concept_proposal_research_facultys"
    ).then((res) => {
      setresearch(res.data);
      console.log("research : ", research);
    });
    Axios.get("http://localhost:4000/api/get/coordinator_budget_type").then(
      (res) => {
        setbudget_type(res.data);
        console.log("budget_type : ", res.data[2].coordinator_Budget_type_name);
      }
    );
    Axios.get(
      "http://localhost:4000/api/get/coordinator_fundingagency_status"
    ).then((res) => {
      setstatus_type(res.data);
      console.log("setstatus_type : ", status_type);
    });
  }, []);

  const animatedComponents = makeAnimated();
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

  // console.log("test :1", project_status);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      console.log("checkValidity");
    } else {
      for (let i = 0; i < select_researchname.length; i = i + 1) {
        select_research.push(select_researchname[i].value);
      }
      // let text = select_research.toString();
      console.log("testSelect : ", select_research);
      Axios.post("http://localhost:4000/api/create/coordinator_fundingagency", {
        funding_project_name: funding_project_name,
        coordinator_project: coordinator_project,
        funding_agency: funding_agency,
        funding_project_leader: funding_project_leader,
        funding_phone: funding_phone,
        select_research: select_research,
        project_status: project_status,
        funding_year: funding_year,
        funding_budget: funding_budget,
        funding_name: funding_name,
        funding_type: funding_type,
        coordinator_univercity_budget: coordinator_univercity_budget,
        // created_date: today,
      }).then(() => {
        setFunding_research([
          ...funding_research,
          {
            funding_project_name: funding_project_name,
            coordinator_project: coordinator_project,
            funding_agency: funding_agency,
            funding_project_leader: funding_project_leader,
            funding_phone: funding_phone,
            select_research: select_research,
            project_status: project_status,
            funding_year: funding_year,
            funding_budget: funding_budget,
            funding_name: funding_name,
            funding_type: funding_type,
            coordinator_univercity_budget: coordinator_univercity_budget,
            // created_date: today,
          },
        ]);
      });
      alert("บันทึกข้อมูลสำเร็จ!!");
    }
  };
  return (
    <>
      <div className="card-header">
        <Row>
          <NavLink to="/addfunding/fundingresearch">
            <button
              className="btn  btn-fundingresearch card-header-menu "
              onClick={() => {
                document
                  .querySelector(".btn-fundingresearch")
                  .classList.remove("btn-primary");
                document
                  .querySelector(".btn-acdemic")
                  .classList.add("btn-primary");
                document
                  .querySelector(".btn-about")
                  .classList.add("btn-primary");
                document
                  .querySelector(".btn-research")
                  .classList.add("btn-primary");
              }}
            >
              แหล่งทุนงานวิจัย
            </button>
          </NavLink>
          <NavLink to="/addfunding/academic">
            <button
              className="btn btn-primary btn-acdemic card-header-menu"
              style={{ marginLeft: "1rem" }}
              onClick={() => {
                document
                  .querySelector(".btn-fundingresearch")
                  .classList.add("btn-primary");
                document
                  .querySelector(".btn-acdemic")
                  .classList.remove("btn-primary");
                document
                  .querySelector(".btn-about")
                  .classList.add("btn-primary");
                document
                  .querySelector(".btn-research")
                  .classList.add("btn-primary");
              }}
            >
              แหล่งทุนงานบริการวิชาการ
            </button>
          </NavLink>
          <NavLink to="/addfunding/aboutfunding">
            <button
              className="btn btn-primary btn-about card-header-menu"
              style={{ marginLeft: "1rem" }}
              onClick={() => {
                document
                  .querySelector(".btn-fundingresearch")
                  .classList.add("btn-primary");
                document
                  .querySelector(".btn-acdemic")
                  .classList.add("btn-primary");
                document
                  .querySelector(".btn-about")
                  .classList.remove("btn-primary");
                document
                  .querySelector(".btn-research")
                  .classList.add("btn-primary");
              }}
            >
              ข้อมูลทั่วไปเกี่ยวกับทุน
            </button>
          </NavLink>
          <NavLink to="/addfunding/research">
            <button
              className="btn btn-primary btn-research card-header-menu"
              style={{ marginLeft: "1rem" }}
              onClick={() => {
                document
                  .querySelector(".btn-fundingresearch")
                  .classList.add("btn-primary");
                document
                  .querySelector(".btn-acdemic")
                  .classList.add("btn-primary");
                document
                  .querySelector(".btn-about")
                  .classList.add("btn-primary");
                document
                  .querySelector(".btn-research")
                  .classList.remove("btn-primary");
              }}
            >
              งานวิจัย
            </button>
          </NavLink>
        </Row>
        <div
          className="projcard-bar"
          style={{ marginLeft: "0", marginRight: "0" }}
        ></div>
      </div>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h4 style={{ textAlign: "center" }}>เพิ่มข้อมูลแหล่งทุน งานวิจัย</h4>

        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body card-body-pading">
          <Row>
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>ชื่อโครงการ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  required
                  onChange={(event) => {
                    setFunding_project_name(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกชื่อโครงการ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>ผู้ประสานงานโครงการ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  required
                  onChange={(event) => {
                    setCoordinator_project(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกผู้ประสานงานโครงการ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <Form.Label>หน่วยงานรับผิดชอบ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  required
                  onChange={(event) => {
                    setFunding_agency(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกหน่วยงานรับผิดชอบ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <div className="form-group">
                <Form.Label>นักวิจัยผู้รับผิดชอบ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setFunding_project_leader(event.target.value);
                  }}
                />
              </div>
            </Col>

            <Col lg={4}>
              <div className="form-group">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control
                  type="phone"
                  className="form-control"
                  onChange={(event) => {
                    setFunding_phone(event.target.value);
                  }}
                />
              </div>
            </Col>
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
                  options={test}
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

            <Col lg={12}>
              <div className="form-group">
                <Form.Label>สถานะโครงการ :</Form.Label>
                <div className="form-control" style={{ border: "none" }}>
                  {status_type.map(function (data, i) {
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
                  })}
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
            <Col lg={5}>
              <div className="form-group">
                <Form.Label>ปีงบประมาณ</Form.Label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    setFunding_year(event.target.value);
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
              </div>
            </Col>

            <Col lg={7}>
              <div className="form-group">
                <Form.Label>งบประมาณที่ได้รับ</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  onChange={(event) => {
                    setFunding_budget(event.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={7}>
              <div className="form-group">
                <Form.Label>ชื่อแหล่งทุน</Form.Label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    setFunding_name(event.target.value);
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

                <div>
                  <i
                    style={{ margin: "0.5rem", cursor: "pointer" }}
                    onClick={() => setModalShow(true)}
                    className="fas fa-plus-circle"
                  >
                    {" "}
                    เพิ่มแหล่งทุน
                  </i>
                </div>
                <Modal
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      เพิ่มแหล่งทุน
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-group">
                      <Row>
                        <Col lg={2}>
                          {" "}
                          <Form.Label>ชื่อแหล่งทุน</Form.Label>
                        </Col>
                        <Col lg={9}>
                          <Form.Control
                            type="text"
                            className="form-control"
                            onChange={(event) => {
                              setSource_funds_name(event.target.value);
                            }}
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
                      onClick={() => setModalShow(false)}
                    >
                      ยกเลิก
                    </Button>
                    <Button
                      href="/addfunding"
                      onClick={() => {
                        Axios.post(
                          "http://localhost:4000/api/create/source_funds",
                          {
                            source_funds_name: source_funds_name,
                          }
                        );
                        setModalShow(false);
                      }}
                    >
                      บันทึก
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Col>

            <Col lg={5}>
              <div className="form-group">
                <Form.Label>ประเภทงบประมาณ</Form.Label>
                <select
                  required
                  className="form-control"
                  onChange={(event) => {
                    setfunding_type(event.target.value);
                  }}
                >
                  <option value="">เลือกประเภทงบประมาณ</option>
                  {budget_type.map((value, i) => {
                    return (
                      <option key={i} value={value.coordinator_Budget_type_id}>
                        {value.coordinator_Budget_type_name}
                      </option>
                    );
                  })}
                </select>
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกประเภทงบประมาณ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>รายได้เข้ามหาลัย</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
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
          <Row>
            <Col>
              <div className="center">
                <Button
                  // onClick={handleSubmit}
                  // href="/"
                  type="submit"
                  className="btn bg-gradient-primary btn-md"
                >
                  บันทึก
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
}
