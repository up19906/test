/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Button, Modal } from "react-bootstrap";
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

  const [about_finding, setabout_finding] = useState([]);
  const [fundingagency_project_type, setfundingagency_project_type] =
    useState(""); //ประเภท
  const [fundingagency_project_name, setfundingagency_project_name] =
    useState(""); //ชื่อโครงการ
  const [fundingagency_project_funding, setfundingagency_project_funding] =
    useState(""); //แหล่งทุน
  const [fundingagency_project_budget, setfundingagency_project_budget] =
    useState(""); //งบประมาณที่ได้รับ
  const [fundingagency_project_star, setfundingagency_project_star] =
    useState(""); //ปี
  const [fundingagency_project_agency, setfundingagency_project_agency] =
    useState(0); //หน่วยงานเจ้าของโครงการ
  const [fundingagency_project_latitude, setfundingagency_project_latitude] =
    useState(""); //พื้นที่ศึกษา lat
  const [fundingagency_project_Longitude, setfundingagency_project_Longitude] =
    useState(""); //พื้นที่ศึกษา long
  // const [create_date, setCreate_date] = useState("");
  const [fundingagency_project_status, setfundingagency_project_status] =
    useState(""); //สถานะโครงการ
  const [fundingagency_project_upload, setfundingagency_project_upload] =
    useState(""); //อัพโหลดเอกสาร

  const [modalShow, setModalShow] = React.useState(false);
  const [source_funds_name, setSource_funds_name] = useState("");

  const [source_funds, setSource_fund] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get/source_funds").then((source) => {
      setSource_fund(source.data);
    });
  }, []);

  const handleSubmit = () => {
    Axios.post(
      "http://localhost:3002/api/create/coordinator_fundingagency_academic",
      {
        fundingagency_project_type: fundingagency_project_type,
        fundingagency_project_name: fundingagency_project_name,
        fundingagency_project_funding: fundingagency_project_funding,
        fundingagency_project_budget: fundingagency_project_budget,
        fundingagency_project_star: fundingagency_project_star,
        fundingagency_project_agency: fundingagency_project_agency,
        fundingagency_project_latitude: fundingagency_project_latitude,
        fundingagency_project_Longitude: fundingagency_project_Longitude,
        fundingagency_project_status: fundingagency_project_status,
        fundingagency_project_upload: fundingagency_project_upload,
        created_date: today,
      }
    ).then(() => {
      setabout_finding([
        ...about_finding,
        {
          fundingagency_project_type: fundingagency_project_type,
          fundingagency_project_name: fundingagency_project_name,
          fundingagency_project_funding: fundingagency_project_funding,
          fundingagency_project_budget: fundingagency_project_budget,
          fundingagency_project_star: fundingagency_project_star,
          fundingagency_project_agency: fundingagency_project_agency,
          fundingagency_project_latitude: fundingagency_project_latitude,
          fundingagency_project_Longitude: fundingagency_project_Longitude,
          fundingagency_project_status: fundingagency_project_status,
          fundingagency_project_upload: fundingagency_project_upload,
          created_date: today,
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

      <form>
        <h4 style={{ textAlign: "center" }}>ข้อมูลทั่วไปเกี่ยวกับทุน</h4>

        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body" style={{ padding: "1rem 7rem 1rem 5rem" }}>
          <Row>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="type_source">ประเภท</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfundingagency_project_type(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label>ชื่อโครงการ</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfundingagency_project_name(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label>แหล่งทุน</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfundingagency_project_funding(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label>งบประมาณที่ได้รับ</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(event) => {
                    setfundingagency_project_budget(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label>ปี</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfundingagency_project_star(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div> */}
            <Col lg={12}>
              <div className="form-group">
                <label>หน่วยงานเจ้าของโครงการ</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfundingagency_project_agency(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label>พื้นที่ศึกษา ( Latitude )</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfundingagency_project_latitude(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label>พื้นที่ศึกษา ( Longitude )</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfundingagency_project_Longitude(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label>ผลสัมถฤทธิ์ที่สำคัญ (หลัก)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfundingagency_project_status(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label>ผลสัมถฤทธิ์ที่สำคัญ (รอง)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfundingagency_project_upload(event.target.value);
                  }}
                />
              </div>
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
