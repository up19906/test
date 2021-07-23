import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";
import { NavLink } from "react-router-dom";

import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { NavLink } from "react-router-dom";

export default function Finding() {
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
  const [fundingagency, setfundingagency] = useState([]);
  const [funding_research, setFunding_research] = useState([]);
  const [getupdate, setGetupdate] = useState([]);
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

  //modal ป็อปอัพ
  const [modalShow, setModalShow] = useState(false);
  const [modalFundingShow, setmodalFundingShow] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [modalShowResearcher, setmodalShowResearcher] = React.useState(false);

  const [source_funds_name, setSource_funds_name] = useState("");
  const [select_researchname, setselect_researchname] = useState("");
  const [research, setresearch] = useState([]);
  const [status_type, setstatus_type] = useState([]);
  const [budget_type, setbudget_type] = useState([]);

  const [source_funds, setSource_fund] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/coordinator_fundingagency").then(
      (fundingagency) => {
        setfundingagency(fundingagency.data);
        console.log("test_fundingagency", fundingagency.data);
      }
    );
    Axios.get(
      "http://localhost:4000/api/get/concept_proposal_research_facultys"
    ).then((res) => {
      setresearch(res.data);
      console.log("research : ", research);
    });
    Axios.get("http://localhost:4000/api/get/source_funds").then((source) => {
      setSource_fund(source.data);
    });
    Axios.get(
      "http://localhost:4000/api/get/coordinator_fundingagency_status"
    ).then((res) => {
      setstatus_type(res.data);
      console.log("setstatus_type : ", status_type);
    });
    Axios.get("http://localhost:4000/api/get/coordinator_budget_type").then(
      (res) => {
        setbudget_type(res.data);
        // console.log(
        //   "budget_type : ",
        //   budget_type[1].coordinator_Budget_type_name
        // );
      }
    );
  }, []);

  const handleSubmitUpdate = (id) => {
    for (let i = 0; i < select_researchname.length; i = i + 1) {
      select_research.push(select_researchname[i].label);
    }
    Axios.put(
      `http://localhost:4000/api/update/coordinator_fundingagency/${id}`,
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
        updated_by: "test",
      }
    ).then(() => {
      setFunding_research([
        ...funding_research,
        {
          funding_project_name: funding_project_name,
          coordinator_project: coordinator_project,
          funding_agency: funding_agency,
          funding_project_leader: funding_project_leader,
          funding_phone: funding_phone,
          funding_year: funding_year,
          funding_budget: funding_budget,
          funding_name: funding_name,
          coordinator_univercity_budget: coordinator_univercity_budget,
          // update_date: today,
        },
      ]);
    });
    setModalShow(false);
    alert("บันทึกข้อมูลสำเร็จ!!");
  };

  const handleGetUpdate = (id) => {
    console.log("test ID : ", id);
    Axios.get(
      `http://localhost:4000/api/get/coordinator_fundingagency/${id}`
    ).then((data) => {
      setGetupdate(data.data);
      setModalShow(true);
      setFunding_project_name(data.data.coordinater_funding_project_name);
      setCoordinator_project(data.data.coordinator_project);
      setFunding_agency(data.data.coordinater_funding_agency);
      setFunding_project_leader(data.data.project_leader);
      setFunding_phone(data.data.coordinater_funding_phone);
      setproject_status(data.data.coordinator_fundingagency_status_id);
      setFunding_year(data.data.coordinater_funding_year);
      setFunding_budget(data.data.coordinater_funding_budget);
      setFunding_name(data.data.coordinater_funding_name);
      setfunding_type(data.data.budget_id);
      setcoordinator_univercity_budget(data.data.coordinator_univercity_budget);
      console.log("testGetupdate : ", getupdate);
      // console.log(
      //   "testGetupdate : Project ",
      //   data.data.coordinater_funding_project_name
      // );
    });
  };
  // console.log("testGetupdate : Project ", getupdate[2]);

  const handleGetDelet = (id) => {
    console.log("test ID : ", id);
    Axios.get(
      `http://localhost:4000/api/get/coordinator_fundingagency/${id}`
    ).then((data) => {
      setGetupdate(data.data);
      setModalShowDelete(true);
    });
  };

  const handleSubmitDelet = (id) => {
    console.log("test ID : ", id);
    Axios.delete(
      `http://localhost:4000/api/delete/coordinator_fundingagency/${id}`
    ).then((data) => {
      alert("ลบโครงงาน สำเร็จ");
    });
  };

  const animatedComponents = makeAnimated();
  var test = [];
  for (let i = 0; i < research.length; i = i + 1) {
    test.push({
      value:
        research[i].research_faculty_username +
        " " +
        research[i].research_faculty_lastname,
      label:
        research[i].research_faculty_username +
        " " +
        research[i].research_faculty_lastname,
    });
  }

  // if (!fundingagency) {
  //   return <div />;
  // }
  return (
    <>
      <Row>
        <Col lg={12}>
          <div
            className="card card-primary card-outline"
            style={{ textAlign: "center" }}
          >
            <div className="card-body">
              <h4>แหล่งทุนงานวิจัย</h4>

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
                                <td>{data.coordinater_funding_project_name}</td>
                                <td>{data.coordinater_funding_name}</td>
                                <td>{data.coordinater_funding_year}</td>
                                <td>{data.coordinater_funding_budget}</td>
                                <td>{data.project_leader}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      handleGetUpdate(
                                        data.coordinater_funding_id
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
                                        data.coordinater_funding_id
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
                    <Col>
                      <div className="center">
                        <NavLink
                          to="/addfunding/fundingresearch"
                          type="button"
                          className="btn bg-gradient-primary btn-md"
                        >
                          เพิ่มข้อมูลแหล่งทุนงานวิจัย
                        </NavLink>
                      </div>
                    </Col>
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
            แก้ไขแหล่งทุนงานวิจัย
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
                    <label htmlFor="type_source">ชื่อโครงการ</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={getupdate.coordinater_funding_project_name}
                      onChange={(event) => {
                        setFunding_project_name(event.target.value);
                      }}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={6}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      ผู้ประสานงานโครงการ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={getupdate.coordinator_project}
                      onChange={(event) => {
                        setCoordinator_project(event.target.value);
                      }}
                    />
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      หน่วยงานรับผิดชอบ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={getupdate.coordinater_funding_agency}
                      onChange={(event) => {
                        setFunding_agency(event.target.value);
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      นักวิจัยผู้รับผิดชอบ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={getupdate.project_leader}
                      onChange={(event) => {
                        setFunding_project_leader(event.target.value);
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
                      defaultValue={getupdate.coordinater_funding_phone}
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
                              <label htmlFor="type_source">
                                ตำแหน่งในโครงการ
                              </label>
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
                            defaultValue={getupdate.coordinater_funding_budget}
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

              <div
                className="projcard-bar"
                style={{ margin: "1.5rem 5rem" }}
              ></div>
              <Row>
                <Col lg={5}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">ปีงบประมาณ</label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        setFunding_year(event.target.value);
                      }}
                    >
                      <option defaultValue={getupdate.coordinater_funding_year}>
                        {getupdate.coordinater_funding_year}
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
                      defaultValue={getupdate.coordinater_funding_budget}
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
                    <label>ชื่อแหล่งทุน</label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        setFunding_name(event.target.value);
                      }}
                    >
                      <option defaultValue={getupdate.coordinater_funding_name}>
                        {" "}
                        {getupdate.coordinater_funding_name}
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
                    <Form.Label>ประเภทงบประมาณ</Form.Label>
                    <select
                      required
                      className="form-control"
                      onChange={(event) => {
                        setfunding_type(event.target.value);
                      }}
                    >
                      <option defaultValue={getupdate.budget_id}></option>
                      {budget_type.map((value, i) => {
                        return (
                          <option
                            key={i}
                            value={value.coordinator_Budget_type_id}
                          >
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
                    <label htmlFor="exampleInputEmail1">รายได้เข้ามหาลัย</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={getupdate.coordinator_univercity_budget}
                      onChange={(event) => {
                        setcoordinator_univercity_budget(event.target.value);
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
              handleSubmitUpdate(getupdate.coordinater_funding_id);
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
          <Modal.Title>ลบข้อมูลแหล่งทุนวิจัย</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ marginLeft: "2rem" }}>
            <h5>ชื่อโครงการ</h5>
            &nbsp;&nbsp;{":"}&nbsp;&nbsp;
            <h5>{getupdate.coordinater_funding_project_name}</h5>
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
              handleSubmitDelet(getupdate.coordinater_funding_id);
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
