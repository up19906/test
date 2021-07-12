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

  //   const [modalShow, setModalShow] = React.useState(false);
  //   const [source_funds_name, setsource_funds_name] = useState("");

  const [source_funds, setSource_fund] = useState([]);
  const [project_type, setproject_type] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get/source_funds").then((source) => {
      setSource_fund(source.data);
    });
    Axios.get("http://localhost:4000/project-type")
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
                รองรับไฟล์ขนาดสูงสุดไม่เกิน 20 MB
              </h6>
            </Col>
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
