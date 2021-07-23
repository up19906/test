/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState, createRef } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function AddResearch() {
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
  const [project_latitude, setproject_latitude] = useState(""); //พื้นที่ศึกษา lat
  const [project_Longitude, setproject_Longitude] = useState(""); //พื้นที่ศึกษา long
  // const [create_date, setCreate_date] = useState("");
  const [project_status, setproject_status] = useState(""); //สถานะโครงการ
  const [file, setfile] = React.useState(); //อัพโหลดเอกสาร
  var select_research = []; //เลือกทีมนักวิจัย

  const [modalShowResearcher, setmodalShowResearcher] = React.useState(false);
  const [validated, setValidated] = useState(false);
  // const [showtableResearcher, setshowtableResearcher] = React.useState(false);
  //   const [source_funds_name, setsource_funds_name] = useState("");
  // const [fname, setfname] = useState(null);
  // const [lname, setlname] = useState(null);
  // const [idcard, setidcard] = useState(null);

  const [source_funds, setSource_fund] = useState([]);
  const [project_type, setproject_type] = useState([]);
  const [status_type, setstatus_type] = useState([]);
  const [select_researchname, setselect_researchname] = useState("");
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

  const researcher = (selectedOptions) => {
    setselect_researchname(selectedOptions);
    for (let i = 0; i < select_researchname.length; i = i + 1) {
      select_research.push(select_researchname[i].value);
    }
  };
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

  const handleSubmit = (event) => {
    // event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      console.log("checkValidity : true :", validated);
    } else {
      console.log("checkValidity : false :", validated);
      const dataArray = new FormData(form.current);
      console.log("data:", dataArray);
      Axios.post(
        "http://localhost:4000/api/post/coordinator_fundingagency_project",
        dataArray
      )
        .then((res) => {
          console.log(res.data.massage);
          // alert(res.data.massage);
        })
        .catch((error) => {
          console.log(error);
          setabout_finding([
            ...about_finding,
            {
              selectProjectType: selectProjectType,
              project_name: project_name,
              selectSourceFunds: selectSourceFunds,
              project_budget: project_budget,
              project_star: project_star,
              project_agency: project_agency,
              project_latitude: project_latitude,
              project_Longitude: project_Longitude,
              project_status: project_status,
              file: file,
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
        <NavLink to="/addfunding/fundingresearch">
          <button
            className="btn btn-primary btn-fundingresearch card-header-menu"
            onClick={() => {
              document
                .querySelector(".btn-fundingresearch")
                .classList.remove("btn-primary");
              document
                .querySelector(".btn-acdemic")
                .classList.add("btn-primary");
              document.querySelector(".btn-about").classList.add("btn-primary");
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
              document.querySelector(".btn-about").classList.add("btn-primary");
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
            className="btn  btn-primary btn-about card-header-menu"
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
            className="btn btn-research card-header-menu"
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              document
                .querySelector(".btn-fundingresearch")
                .classList.add("btn-primary");
              document
                .querySelector(".btn-acdemic")
                .classList.add("btn-primary");
              document.querySelector(".btn-about").classList.add("btn-primary");
              document
                .querySelector(".btn-research")
                .classList.remove("btn-primary");
            }}
          >
            งานวิจัย
          </button>
        </NavLink>
        <div
          className="projcard-bar"
          style={{ marginLeft: "0", marginRight: "0" }}
        ></div>
      </div>

      <Form ref={form} noValidate validated={validated} onSubmit={handleSubmit}>
        <h4 style={{ textAlign: "center" }}>งานวิจัย</h4>

        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body card-body-pading">
          <Row>
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
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>ทีมนักวิจัย</Form.Label>
                <Select
                  closeMenuOnSelect={false}
                  name="select_research"
                  components={animatedComponents}
                  onChange={(selectedOptions) => researcher(selectedOptions)}
                  // defaultValue={[colourOptions[4], colourOptions[5]]}
                  isMulti
                  options={test}
                />
                <div>
                  <i
                    style={{
                      margin: "0.5rem",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
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
            <Col lg={6}>
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
            {/* <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div> */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>หน่วยงานเจ้าของโครงการ</Form.Label>
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
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>พื้นที่ศึกษา ( Latitude )</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="project_latitude"
                  className="form-control"
                  onChange={(event) => {
                    setproject_latitude(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกพื้นที่ศึกษา ( Latitude )
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>พื้นที่ศึกษา ( Longitude )</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="project_Longitude"
                  className="form-control"
                  onChange={(event) => {
                    setproject_Longitude(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกพื้นที่ศึกษา ( Longitude )
                  </h6>
                </Form.Control.Feedback>
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
                      ** โปรดกรอกสถานะโครงการ
                    </h6>
                  </Form.Control.Feedback>
                </div>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-group">
                <Form.Label>อัพโหลดเอกสาร</Form.Label>
                <Form.Control
                  id="file"
                  type="file"
                  required
                  name="project_upload"
                  style={{ paddingTop: "0.7rem", paddingBottom: "2.5rem" }}
                  className="form-control"
                  onChange={(event) => {
                    setfile(event.target.files[0]);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>** โปรดอัพโหลดเอกสาร</h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            <Col lg={4}>
              <br />
              <br />
              <h6 style={{ color: "red" }}>
                ** รองรับไฟล์ขนาดสูงสุดไม่เกิน 20 MB
              </h6>
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
