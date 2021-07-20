import React, { useState, useEffect } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Researcher() {
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

  useEffect(() => {
    Axios.get(
      "http://localhost:4000/api/get/coordinator_fundingagency_academic"
    ).then((fundingagency) => {
      setfundingagency(fundingagency.data);
      console.log("test_fundingagency", fundingagency);
    });
  }, []);
  return (
    <div>
      <div className="card-header">
        <NavLink to="/allreport">
          <button
            className="btn  btn-reportresercher card-header-menu"
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
            className="btn btn-primary btn-reportresearch card-header-menu"
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
        <h4 style={{ textAlign: "center" }}>สรุปรายงานนักวิจัย</h4>

        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body card-body-pading">
          <Row>
            <Col lg={4}>
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
                <label htmlFor="type_source">จำนวนนักวิจัยที่ได้รับทุน</label>
                <h6>100 คน</h6>
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
                  element={
                    <Button className="btn btn-block bg-gradient-primary btn-md">
                      ดาวน์โหลดรายงานนักวิจัย
                    </Button>
                  }
                >
                  <ExcelSheet data={fundingagency} name="Employees">
                    <ExcelColumn label="Name" value="fundingagency_ac_name" />
                    <ExcelColumn
                      label="Wallet Money"
                      value="funding_ac_budget"
                    />
                    <ExcelColumn label="Gender" value="funding_ac_name" />
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

export default Researcher;
