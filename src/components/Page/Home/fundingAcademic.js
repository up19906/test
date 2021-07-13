import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import Axios from "axios";

export default function FindingAcademic() {
  var date = new Date();
  var today =
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-") +
    " " +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
  console.log("testdate:string 2", today);
  const year = [
    { value: [date.getFullYear() + 543] },
    { value: [date.getFullYear() + 542] },
    { value: [date.getFullYear() + 541] },
    { value: [date.getFullYear() + 540] },
    { value: [date.getFullYear() + 539] },
  ];
  const [fundingagency, setfundingagency] = useState([]);
  const [funding_academic, setfunding_academic] = useState([]);
  const [getupdate, setGetupdate] = useState([]);
  const [funding_ac_name, setfunding_ac_name] = useState(""); //ชื่อโครงการ
  const [funding_ac_project, setfunding_ac_project] = useState(""); //ผู้ประสานงาน
  const [funding_ac_agency, setfunding_ac_agency] = useState(""); //หน่วยงานที่รับผิดชอบ
  const [funding_ac_leader, setfunding_ac_leader] = useState(""); //นักวิจัยผู้รับผิดชอบ
  const [funding_ac_phone, setfunding_ac_phone] = useState(0); //เบอร์ติดต่อ
  const [funding_ac_year, setfunding_ac_year] = useState(0); //ปีงบประมาณ
  const [funding_ac_budget, setfunding_ac_budget] = useState(0); //งบประมาณ
  const [funding_name, setFunding_name] = useState(""); //ชื่อแหล่งทุน
  const [
    coordinator_univercity_ac_budget,
    setcoordinator_univercity_ac_budget,
  ] = useState(""); //รายได้เข้ามหาลัย
  const [modalShow, setModalShow] = useState(false);
  const [modalFundingShow, setmodalFundingShow] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [source_funds_name, setSource_funds_name] = useState("");

  const [source_funds, setSource_fund] = useState([]);

  useEffect(() => {
    Axios.get(
      "http://localhost:4000/api/get/coordinator_fundingagency_academic"
    ).then((fundingagency) => {
      setfundingagency(fundingagency.data);
      console.log("test_fundingagency", fundingagency);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/source_funds").then((source) => {
      setSource_fund(source.data);
    });
  }, []);

  const handleSubmitUpdate = (id) => {
    Axios.put(
      `http://localhost:4000/api/update/coordinator_fundingagency_academic/${id}`,
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
        update_date: today,
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
          update_date: today,
        },
      ]);
    });
    setModalShow(false);
  };

  const handleGetUpdate = (id) => {
    Axios.get(
      `http://localhost:4000/api/get/coordinator_fundingagency_academic/${id}`
    ).then((data) => {
      setGetupdate(data.data[0]);
      setModalShow(true);
      setfunding_ac_name(data.data[0].coordinator_fundingagency_ac_name);
      setfunding_ac_project(data.data[0].coordinator_ac_project);
      setfunding_ac_agency(data.data[0].coordinater_funding_ac_agency);
      setfunding_ac_leader(data.data[0].project_ac_leader);
      setfunding_ac_phone(data.data[0].coordinater_funding_ac_phone);
      setfunding_ac_year(data.data[0].coordinater_funding_ac_year);
      setfunding_ac_budget(data.data[0].coordinater_funding_ac_budget);
      setFunding_name(data.data[0].coordinater_funding_ac_name);
      setcoordinator_univercity_ac_budget(
        data.data[0].coordinator_univercity_ac_budget
      );
      console.log("testGetupdate : ", data);
      console.log("testGetupdate : Project ", data.data[0]);
    });
  };

  const handleGetDelet = (id) => {
    console.log("test ID : ", id);
    Axios.get(
      `http://localhost:4000/api/get/coordinator_fundingagency_academic/${id}`
    ).then((data) => {
      setGetupdate(data.data[0]);
      setModalShowDelete(true);
    });
  };

  const handleSubmitDelet = (id) => {
    console.log("test ID : ", id);
    Axios.delete(
      `http://localhost:4000/api/delete/coordinator_fundingagency_academic/${id}`
    ).then((data) => {
      alert("ลบโครงงาน สำเร็จ");
    });
  };

  if (!fundingagency) {
    return <div />;
  }
  return (
    <>
      <Row>
        <Col lg={12}>
          <div
            className="card card-primary card-outline"
            style={{ textAlign: "center" }}
          >
            <div className="card-body">
              <h4>แหล่งทุนงานบริการวิชาการ</h4>

              <Row>
                <Col lg={12}>
                  <div className="card">
                    <div className="card-header">
                      <div className="card-tools">
                        <div
                          className="input-group input-group-sm"
                          style={{ width: 150 }}
                        ></div>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body table-responsive p-0">
                      <table className="table table-hover text-nowrap">
                        <thead>
                          <tr>
                            <th>ชื่อโครงการ</th>
                            <th>ชื่อแหล่งทุน</th>
                            <th>ประจำปี</th>
                            <th>งบประมาณ</th>
                            <th>ผู้รับผิดชอบ</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* เริ่มดึงmap มาตรงนี้ */}
                          {fundingagency.map(function (data, i) {
                            return (
                              <tr key={i}>
                                <td>
                                  {data.coordinator_fundingagency_ac_name}
                                </td>
                                <td>{data.coordinater_funding_ac_name}</td>
                                <td>{data.coordinater_funding_ac_year}</td>
                                <td>{data.coordinater_funding_ac_budget}</td>
                                <td>{data.project_ac_leader}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      handleGetUpdate(
                                        data.coordinator_fundingagency_ac_id
                                      );
                                    }}
                                    className="btn btn-primary"
                                    style={{ padding: ".02rem .5rem" }}
                                  >
                                    <i
                                      className="fas fa-edit"
                                      aria-hidden="true"
                                    />
                                  </button>
                                  {"   "}|{"   "}
                                  <button
                                    onClick={() => {
                                      handleGetDelet(
                                        data.coordinator_fundingagency_ac_id
                                      );
                                    }}
                                    className="btn btn-danger"
                                    style={{
                                      padding: ".02rem .5rem",
                                    }}
                                  >
                                    <i
                                      className="fas fa-trash-alt"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Row>
                    <Col lg={5}></Col>
                    <Col lg={2}>
                      <a
                        href="/addfunding/academic"
                        type="button"
                        className="btn btn-block bg-gradient-primary btn-md"
                      >
                        เพิ่มข้อมูลแหล่งทุนงานบริการวิชาการ
                      </a>
                    </Col>
                    <Col lg={5}></Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      {/*  ป็อปอัพ อัพเดตข้อมูล */}
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            แก้ไขแหล่งทุนงานบริการวิชาการ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div
              className="card-body"
              style={{ padding: "1rem 7rem 1rem 5rem" }}
            >
              <Row>
                <Col lg={12}>
                  <div className="form-group">
                    <label>ชื่อโครงการ</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={getupdate.coordinator_fundingagency_ac_name}
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
                    <label>ผู้ประสานงานโครงการ</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={getupdate.coordinator_ac_project}
                      onChange={(event) => {
                        setfunding_ac_project(event.target.value);
                      }}
                    />
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="form-group">
                    <label>หน่วยงานรับผิดชอบ</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={getupdate.coordinater_funding_ac_agency}
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
                    <label>นักวิจัยผู้รับผิดชอบ</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={getupdate.project_ac_leader}
                      onChange={(event) => {
                        setfunding_ac_leader(event.target.value);
                      }}
                    />
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="form-group">
                    <label>เบอร์ติดต่อ</label>
                    <input
                      type="phone"
                      className="form-control"
                      defaultValue={getupdate.coordinater_funding_ac_phone}
                      onChange={(event) => {
                        setfunding_ac_phone(event.target.value);
                      }}
                    />
                  </div>
                </Col>
              </Row>

              <div
                className="projcard-bar"
                style={{ margin: "1.5rem 5rem" }}
              ></div>
              <Row>
                <Col lg={5}>
                  <div className="form-group">
                    <label>ปีงบประมาณ</label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        setfunding_ac_year(event.target.value);
                      }}
                    >
                      <option
                        defaultValue={getupdate.coordinater_funding_ac_year}
                      >
                        {getupdate.coordinater_funding_ac_year}
                      </option>
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
                    <label htmlFor="exampleInputEmail1">
                      งบประมาณที่ได้รับ
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={getupdate.coordinater_funding_ac_budget}
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
                      <option defaultValue={funding_name}>
                        {" "}
                        {funding_name}
                      </option>
                      {source_funds.map((value, i) => {
                        return (
                          <option key={i} value={value.source_funds_name}>
                            {value.source_funds_name}
                          </option>
                        );
                      })}
                    </select>

                    <div
                      style={{ margin: "0.5rem", cursor: "pointer" }}
                      onClick={() => setmodalFundingShow(true)}
                    >
                      <i className="fas fa-plus-circle"> เพิ่มแหล่งทุน</i>
                    </div>
                    <Modal
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      show={modalFundingShow}
                      onHide={() => setmodalFundingShow(false)}
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
                          onClick={() => setmodalFundingShow(false)}
                        >
                          ยกเลิก
                        </Button>
                        <Button
                          onClick={() => {
                            Axios.post(
                              "http://localhost:4000/api/create/source_funds",
                              {
                                source_funds_name: source_funds_name,
                                created_date: today,
                              }
                            );
                            setmodalFundingShow(false);
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
                      defaultValue={coordinator_univercity_ac_budget}
                      onChange={(event) => {
                        setcoordinator_univercity_ac_budget(event.target.value);
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </form>
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
            variant="primary"
            onClick={() => {
              handleSubmitUpdate(getupdate.coordinator_fundingagency_ac_id);
            }}
            href="/"
            type="button"
          >
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  ป็อปลบข้อมูล */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>ลบข้อมูลแหล่งทุนงานบริการวิชาการ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ marginLeft: "2rem" }}>
            <h5>ชื่อโครงการ</h5>
            &nbsp;&nbsp;{":"}&nbsp;&nbsp;
            <h5>{getupdate.coordinator_fundingagency_ac_name}</h5>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShowDelete(false)}>
            ยกเลิก
          </Button>
          <Button
            variant="primary"
            // onClick={() => setModalShowDelete(false)}
            onClick={() => {
              handleSubmitDelet(getupdate.coordinator_fundingagency_ac_id);
            }}
            href="/"
            type="button"
          >
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
