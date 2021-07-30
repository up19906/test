/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState, createRef } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";
import { connect } from "react-redux";
import { longdo, map, LongdoMap } from "./LongdoMap";

function AddStudyArea(props) {
  console.log("testconcept:", props.concept);
  const mapKey = "de77f24988fb95703631f4f8800d502c";
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

  const [validated, setValidated] = useState(false);

  const initMap = () => {
    map.Layers.setBase(longdo.Layers.GRAY);
    // new longdo.Marker({ lon: 100.56, lat: 13.74 });
  };
  //   var marker = new longdo.Marker({ lon: 100.56, lat: 13.74 });

  const [status_type, setstatus_type] = useState([]);

  const [research, setresearch] = useState([]);

  useEffect(() => {
    Axios.get(
      "http://localhost:4000/api/get/concept_proposal_research_facultys"
    ).then((res) => {
      setresearch(res.data);
      console.log("research : ", research);
    });

    Axios.get(
      "http://localhost:4000/api/get/coordinator_fundingagency_status"
    ).then((res) => {
      setstatus_type(res.data);
      console.log("setstatus_type : ", status_type);
    });
  }, []);

  const handleSubmit = (event) => {
    // event.preventDefault();
    const forms = event.currentTarget;
    if (forms.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      console.log("checkValidity : true :", validated);
    } else {
      // console.log("checkValidity : false :", validated);
      const dataArray = new FormData(form.current);
      // console.log("data:", dataArray);
      Axios.post(
        "http://localhost:4000/api/post/coordinator_fundingagency_project",
        dataArray
      )
        .then(() => {
          alert("บันทึกข้อมูลสำเร็จ!!");
          // console.log(res.data.massage);
          // alert(res.data.massage);
        })
        .catch((error) => {
          console.log(error);
        });
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
    }
  };
  return (
    <React.Fragment>
      <Form ref={form} noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body card-body-pading">
          <h5 style={{ textAlign: "left" }}>พื้นที่ศึกษา</h5>
        </div>
        <div className="card-body card-body-pading">
          <Row>
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>ชื่อชุมชน</Form.Label>
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

            {/* <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div> */}
            <Col lg={8}>
              <div className="form-group">
                <Form.Label>ผู้ประสานงาน</Form.Label>
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
            <Col lg={4}>
              <div className="form-group">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
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
                <Form.Label>Latitude</Form.Label>
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
                <Form.Label>Longitude</Form.Label>
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
              <div className="form-group" style={{ height: "35vh" }}>
                <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
                {/* <map ></map> */}
              </div>
            </Col>
          </Row>
        </div>
        <div
          className="card-footer"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <Row style={{ padding: "0 5rem" }}>
            <Col lg={6} style={{ float: "left" }}>
              {/* <Button
                  // onClick={handleSubmit}
                  // href="/"
                  // type="submit"
                  className="btn bg-gradient-primary btn-md"
                > */}
              <NavLink
                className="btn bg-gradient-primary btn-md"
                to="/research"
              >
                ย้อนกลับ
              </NavLink>

              {/* </Button> */}
            </Col>
            <Col lg={6} style={{ textAlign: "right" }}>
              <NavLink
                to="/research/network"
                // onClick={handleSubmit}
                // href="/"
                //   type="submit"
                className="btn bg-gradient-primary btn-md"
              >
                ถัดไป
              </NavLink>
            </Col>
          </Row>
        </div>
      </Form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  concept: state.concept.concept,
});

export default connect(mapStateToProps)(AddStudyArea);
