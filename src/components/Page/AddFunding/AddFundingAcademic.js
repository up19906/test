/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Axios from "axios";

export default function AddFundingAcademic() {
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

  const [funding_academic, setfunding_academic] = useState([]);
  const [funding_ac_name, setfunding_ac_name] = useState(""); //ชื่อโครงการ
  const [funding_ac_project, setfunding_ac_project] = useState(""); //ผู้ประสานงาน
  const [funding_ac_agency, setfunding_ac_agency] = useState(""); //หน่วยงานที่รับผิดชอบ
  const [funding_ac_leader, setfunding_ac_leader] = useState(""); //นักวิจัยผู้รับผิดชอบ
  const [funding_ac_phone, setfunding_ac_phone] = useState(0); //เบอร์ติดต่อ
  const [funding_ac_year, setfunding_ac_year] = useState(0); //ปีงบประมาณ
  const [funding_ac_budget, setfunding_ac_budget] = useState(0); //งบประมาณ
  const [funding_name, setFunding_name] = useState(""); //ชื่อแหล่งทุน
  // const [create_date, setCreate_date] = useState("");
  const [
    coordinator_univercity_ac_budget,
    setcoordinator_univercity_ac_budget,
  ] = useState(""); //รายได้เข้ามหาลัย
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
        funding_ac_name: funding_ac_name,
        funding_ac_project: funding_ac_project,
        funding_ac_agency: funding_ac_agency,
        funding_ac_leader: funding_ac_leader,
        funding_ac_phone: funding_ac_phone,
        funding_ac_year: funding_ac_year,
        funding_ac_budget: funding_ac_budget,
        funding_name: funding_name,
        coordinator_univercity_ac_budget: coordinator_univercity_ac_budget,
        created_date: today,
      }
    ).then(() => {
      setfunding_academic([
        ...funding_academic,
        {
          funding_ac_name: funding_ac_name,
          funding_ac_project: funding_ac_project,
          funding_ac_agency: funding_ac_agency,
          funding_ac_leader: funding_ac_leader,
          funding_ac_phone: funding_ac_phone,
          funding_ac_year: funding_ac_year,
          funding_ac_budget: funding_ac_budget,
          funding_name: funding_name,
          coordinator_univercity_ac_budget: coordinator_univercity_ac_budget,
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
            className="btn  btn-acdemic"
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
            className="btn btn-primary btn-about"
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
            className="btn btn-primary btn-research"
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
        <h4 style={{ textAlign: "center" }}>
          เพิ่มข้อมูลแหล่งทุน งานบริการวิชาการ
        </h4>

        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body" style={{ padding: "1rem 7rem 1rem 5rem" }}>
          <Row>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="type_source">ชื่อโครงการ</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfunding_ac_name(event.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">ผู้ประสานงานโครงการ</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfunding_ac_project(event.target.value);
                  }}
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">หน่วยงานรับผิดชอบ</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfunding_ac_agency(event.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">นักวิจัยผู้รับผิดชอบ</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setfunding_ac_leader(event.target.value);
                  }}
                />
              </div>
            </Col>

            <Col lg={4}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">เบอร์ติดต่อ</label>
                <input
                  type="phone"
                  className="form-control"
                  onChange={(event) => {
                    setfunding_ac_phone(event.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>

          <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
          <Row>
            <Col lg={5}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">ปีงบประมาณ</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    setfunding_ac_year(event.target.value);
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
                <label htmlFor="exampleInputEmail1">งบประมาณที่ได้รับ</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(event) => {
                    setfunding_ac_budget(event.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={7}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">ชื่อแหล่งทุน</label>
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
                    className="fas fa-plus-circle"
                    onClick={() => setModalShow(true)}
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
                          <label htmlFor="type_source">ชื่อแหล่งทุน</label>
                        </Col>
                        <Col lg={9}>
                          <input
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
                      href="/addfunding/academic"
                      onClick={() => {
                        Axios.post(
                          "http://localhost:3002/api/create/source_funds",
                          {
                            source_funds_name: source_funds_name,
                            created_date: today,
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
                <label htmlFor="exampleInputEmail1">รายได้เข้ามหาลัย</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(event) => {
                    setcoordinator_univercity_ac_budget(event.target.value);
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
