/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState, createRef } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";

export default function AddResearch() {
  var date = new Date();
  var today =
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-") +
    " " +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
  console.log("testdate:string", today);
  const year = [
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

  const [modalShowResearcher, setmodalShowResearcher] = React.useState(false);
  const [showtableResearcher, setshowtableResearcher] = React.useState(false);
  //   const [source_funds_name, setsource_funds_name] = useState("");

  const [source_funds, setSource_fund] = useState([]);
  const [project_type, setproject_type] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/source_funds").then((source) => {
      setSource_fund(source.data);
    });
    Axios.get("http://localhost:4000/api/get/project-type")
      .then((resp) => {
        // console.log(resp.data);
        setproject_type(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    // event.preventDefault();
    const dataArray = new FormData(form.current);
    console.log("data:", dataArray);
    Axios.post("http://localhost:4000/project", dataArray)
      .then((res) => {
        console.log(res.data.massage);
        alert(res.data.massage);
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
  };
  return (
    <>
      <div className="card-header">
        <NavLink to="/addfunding">
          <button
            className="btn btn-primary btn-fundingresearch"
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
            className="btn btn-primary btn-acdemic"
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
            className="btn  btn-primary btn-about"
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
            className="btn btn-research"
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

      <form ref={form}>
        <h4 style={{ textAlign: "center" }}>งานวิจัย</h4>

        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body" style={{ padding: "1rem 7rem 1rem 5rem" }}>
          <Row>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="type_source">ประเภท</label>
                <select
                  className="form-control"
                  name="project_type"
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
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label>ชื่อโครงการ</label>
                <input
                  type="text"
                  name="project_name"
                  className="form-control"
                  onChange={(event) => {
                    setproject_name(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label>แหล่งทุน</label>
                <select
                  className="form-control"
                  name="project_funding"
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
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label>งบประมาณที่ได้รับ</label>
                <input
                  type="number"
                  name="project_budget"
                  className="form-control"
                  onChange={(event) => {
                    setproject_budget(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">ปีงบประมาณ</label>
                <select
                  className="form-control"
                  name="project_star"
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
              </div>
            </Col>
            {/* <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div> */}
            <Col lg={12}>
              <div className="form-group">
                <label>หน่วยงานเจ้าของโครงการ</label>
                <input
                  type="text"
                  name="project_agency"
                  className="form-control"
                  onChange={(event) => {
                    setproject_agency(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label>พื้นที่ศึกษา ( Latitude )</label>
                <input
                  type="text"
                  name="project_latitude"
                  className="form-control"
                  onChange={(event) => {
                    setproject_latitude(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label>พื้นที่ศึกษา ( Longitude )</label>
                <input
                  type="text"
                  name="project_Longitude"
                  className="form-control"
                  onChange={(event) => {
                    setproject_Longitude(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label>สถานะโครงการ :</label>
                <div className="form-control" style={{ border: "none" }}>
                  <Form.Check
                    style={{ marginLeft: "2rem" }}
                    inline
                    label="อยู่ระหว่างดำเนินการ"
                    name="project_status"
                    value="อยู่ระหว่างดำเนินการ"
                    type="radio"
                    onChange={(event) => {
                      setproject_status(event.target.value);
                    }}
                  />
                  <Form.Check
                    style={{ marginLeft: "3rem" }}
                    inline
                    label="โครงการวิจัยเสร็จสิ้น"
                    name="project_status"
                    value="โครงการวิจัยเสร็จสิ้น"
                    type="radio"
                    onChange={(event) => {
                      setproject_status(event.target.value);
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-group">
                <label>อัพโหลดเอกสาร</label>
                <input
                  id="file"
                  type="file"
                  name="project_upload"
                  style={{ paddingTop: "0.7rem", paddingBottom: "2.5rem" }}
                  className="form-control"
                  onChange={(event) => {
                    setfile(event.target.files[0]);
                  }}
                />
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
          <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
          <Row>
            <Col lg={12}>
              <h5 style={{ margin: "1rem 0" }}>รายละเอียดของคณะผู้วิจัย</h5>
            </Col>
            <Col lg={12}>
              {" "}
              <div>
                <i
                  style={{
                    margin: "0.5rem",
                    cursor: "pointer",
                    float: "right",
                  }}
                  onClick={() => setmodalShowResearcher(true)}
                  className="fas fa-plus-circle"
                >
                  {" "}
                  เพิ่มทีมนักวิจัย
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
                            onChange={(event) => {
                              setproject_Longitude(event.target.value);
                            }}
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
                            onChange={(event) => {
                              setproject_Longitude(event.target.value);
                            }}
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
                    href="/addfunding"
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
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label>ชื่อ</label>
                <input
                  type="text"
                  name="project_Longitude"
                  className="form-control"
                  onChange={(event) => {
                    setproject_Longitude(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label>นามสกุล</label>
                <input
                  type="text"
                  name="project_Longitude"
                  className="form-control"
                  onChange={(event) => {
                    setproject_Longitude(event.target.value);
                  }}
                />
              </div>
            </Col>

            <Col lg={12}>
              <div className="form-group">
                <label>หมายเลขบัตรประชาชน</label>
                <input
                  type="text"
                  name="project_Longitude"
                  className="form-control"
                  onChange={(event) => {
                    setproject_Longitude(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={2}>
              <Button
                style={{ float: "right" }}
                onClick={() => {
                  setshowtableResearcher(true);
                }}
              >
                {" "}
                ค้นหา
              </Button>
            </Col>
            <Col lg={8}>
              <h6 style={{ marginTop: "0.5rem" }}>
                ** สามารถค้นหาได้เฉพาะนักวิจัยที่มีสิทธิ์เข้าระบบแล้วเท่านั้น
              </h6>
            </Col>
            {showtableResearcher === true ? (
              <Col lg={12}>
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>รหัส</th>
                        <th>ชื่อ - สกุล</th>
                        <th>หน่วยงาน</th>
                        <th>เลือก</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>
                          <Form.Check
                            style={{ marginLeft: "0.5rem" }}
                            inline
                            // label="โครงการวิจัยเสร็จสิ้น"
                            name="researcher"
                            value="โครงการวิจัยเสร็จสิ้น"
                            type="checkbox"
                            // onChange={(event) => {
                            //   setproject_status(event.target.value);
                            // }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            ) : null}
          </Row>
        </div>
        <div
          className="card-footer"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <Row>
            <Col lg={5}></Col>
            <Col lg={2}>
              <a
                onClick={handleSubmit}
                href="/"
                type="button"
                className="btn btn-block bg-gradient-primary btn-md"
              >
                บันทึก
              </a>
            </Col>
            <Col lg={5}></Col>
          </Row>
        </div>
      </form>
    </>
  );
}
