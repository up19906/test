import React, { useState, useEffect } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Research() {
  var date = new Date();
  const year = [
    { value: [date.getFullYear() + 544] },
    { value: [date.getFullYear() + 543] },
    { value: [date.getFullYear() + 542] },
    { value: [date.getFullYear() + 541] },
    { value: [date.getFullYear() + 540] },
    { value: [date.getFullYear() + 539] },
  ];
  const [fundingagency, setfundingagency] = useState([]);
  const [source_funds, setSource_fund] = useState([]);
  const [project_type, setproject_type] = useState([]);
  const [budget_type, setbudget_type] = useState([]);

  // useEffect(() => {
  //   Axios.get("http://localhost:4000/api/get/source_funds").then((source) => {
  //     setSource_fund(source.data);
  //   });
  //   Axios.get("http://localhost:4000/api/get/project-type")
  //     .then((resp) => {
  //       // console.log(resp.data);
  //       setproject_type(resp.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   Axios.get("http://localhost:4000/api/get/coordinator_budget_type").then(
  //     (res) => {
  //       setbudget_type(res.data);
  //       console.log("budget_type : ", budget_type);
  //     }
  //   );
  //   Axios.get(
  //     "http://localhost:4000/api/get/coordinator_fundingagency_academic"
  //   ).then((fundingagency) => {
  //     setfundingagency(fundingagency.data);
  //     console.log("test_fundingagency", fundingagency);
  //   });
  // }, []);

  return (
    <div>
      <div className="card-header">
        <NavLink to="/allreport">
          <button
            className="btn btn-primary btn-reportresercher card-header-menu"
            onClick={() => {
              document
                .querySelector(".btn-reportresercher")
                .classList.remove("btn-primary");
              document
                .querySelector(".btn-reportbudget")
                .classList.add("btn-primary");
              document
                .querySelector(".btn-reportresearch")
                .classList.add("btn-primary");
            }}
          >
            รายงานนักวิจัยวิจัย
          </button>
        </NavLink>
        <NavLink to="/allreport/reportbudget">
          <button
            className="btn btn-primary btn-reportbudget card-header-menu"
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              document
                .querySelector(".btn-reportresercher")
                .classList.add("btn-primary");
              document
                .querySelector(".btn-reportbudget")
                .classList.remove("btn-primary");
              document
                .querySelector(".btn-reportresearch")
                .classList.add("btn-primary");
            }}
          >
            รายงานงบประมาณ
          </button>
        </NavLink>
        <NavLink to="/allreport/reportresearch">
          <button
            className="btn  btn-reportresearch card-header-menu"
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              document
                .querySelector(".btn-reportresercher")
                .classList.add("btn-primary");
              document
                .querySelector(".btn-reportbudget")
                .classList.add("btn-primary");
              document
                .querySelector(".btn-reportresearch")
                .classList.remove("btn-primary");
            }}
          >
            รายงานงานวิจัย
          </button>
        </NavLink>

        <div
          className="projcard-bar"
          style={{ marginLeft: "0", marginRight: "0" }}
        ></div>
      </div>

      <form>
        <h4 style={{ textAlign: "center" }}>สรุปรายงานงานวิจัย</h4>

        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body card-body-pading">
          <Row>
            <Col lg={2}>
              <div className="form-group">
                <label htmlFor="type_source">ปีงบประมาณ</label>
                <select
                  className="form-control"
                  //   onChange={(event) => {
                  //     setFunding_year(event.target.value);
                  //   }}
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
            <Col lg={4}>
              <div className="form-group">
                <label htmlFor="type_source">ประเภทงบประมาณ</label>
                <select
                  className="form-control"
                  //   onChange={(event) => {
                  //     setFunding_year(event.target.value);
                  //   }}
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
              </div>
            </Col>
            <Col lg={3}>
              <div className="form-group">
                <label htmlFor="type_source">แหล่งทุน</label>
                <select
                  className="form-control"
                  //   onChange={(event) => {
                  //     setFunding_year(event.target.value);
                  //   }}
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
            <Col lg={3}>
              <div className="form-group">
                <label htmlFor="type_source">ประเภทงานวิจัย</label>
                <select
                  className="form-control"
                  //   onChange={(event) => {
                  //     setFunding_year(event.target.value);
                  //   }}
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
          </Row>
        </div>
        <div
          className="card-footer"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <Row>
            <Col>
              <div className="center">
                <ExcelFile
                  filename="ReportReserch"
                  element={
                    <Button className="btn btn-block bg-gradient-primary btn-md">
                      ดาวน์โหลดรายงานงานวิจัย
                    </Button>
                  }
                >
                  <ExcelSheet data={fundingagency} name="ReportReserch">
                    <ExcelColumn
                      label="ลำดับที่"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn
                      label="รหัสนักวิจัย"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn
                      label="ชื่อนักวิจัย"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn
                      label="โครงการวิจัย"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn
                      label="วัตถุประสงค์"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn
                      label="งบประมาณ"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn
                      label="ปีงบประมาณ"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn
                      label="ประเภททุน"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn label="แหล่งทุน" value="funding_ac_budget" />
                    <ExcelColumn label="output" value="fundingagency_ac_name" />
                    <ExcelColumn
                      label="outcome"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn label="impact" value="fundingagency_ac_name" />
                    <ExcelColumn
                      label="พื้นที่ดำเนินงาน"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn
                      label="ผู้ร่วมวิจัย"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn label="SDG" value="fundingagency_ac_name" />
                    <ExcelColumn label="BCG" value="fundingagency_ac_name" />
                    <ExcelColumn
                      label="10S-Curve"
                      value="fundingagency_ac_name"
                    />
                    <ExcelColumn
                      label="RMUTICLITUR"
                      value="fundingagency_ac_name"
                    />
                  </ExcelSheet>
                </ExcelFile>
              </div>
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
}

export default Research;
