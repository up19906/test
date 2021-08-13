/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { MapContainer, TileLayer, MapConsumer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./constants";
import {
  addconcept,
  addnetwork,
  get_co_research_group,
  insertconcept,
  clearconcept,
} from "../../../redux/conceptProposal/action";

import ApiData from "../../../api/index";

function Network(props) {
  const [co_researcher_name_th, setco_researcher_name_th] = useState(""); //ชื่อชุมชน
  const [co_researcher_group_id, setco_researcher_group_id] = useState(""); //ประเภทเครือข่าย
  const [coordinator_name_th, setcoordinator_name_th] = useState(""); //ผู้ประสานงาน
  const [co_researcher_phone, setco_researcher_phone] = useState(""); //เบอร์ติดต่อ
  const [co_researcher_latitude, setco_researcher_latitude] = useState(0); //พื้นที่ศึกษา lat
  const [co_researcher_longitude, setco_researcher_longitude] = useState(0); //พื้นที่ศึกษา long

  useEffect(() => {
    props.get_co_research_group();
  }, []);

  const project_type_id = props.concept.project_type_id;
  const concept_proposal_name = props.concept.concept_proposal_name;
  const source_funds_id = props.concept.source_funds_id;
  const concept_year = props.concept.concept_year;
  const concept_budget = props.concept.concept_budget;
  const concept_univercity_budget = props.concept.concept_univercity_budget;
  const concept_leader = props.concept.concept_leader;
  const concept_phone = props.concept.concept_phone;
  const concept_proposal_type = props.concept.concept_proposal_type;
  const co_researcher_id = [];
  const concpt_proposal_sub = [];

  // function delay() {
  //   return new Promise((resolve) => setTimeout(resolve, 300));
  // }

  async function insertsubconcept(data) {
    try {
      const res = await ApiData.create_concept(data);
      console.log("testInsert ..........", res.data);
      concpt_proposal_sub.push(res.data.id);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async function insertstudyarea(data) {
    try {
      const res = await ApiData.create_co_research(data);
      console.log("testInsert ..........", res.data);
      co_researcher_id.push(res.data.id);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async function insertnetwork(data) {
    try {
      const res = await ApiData.create_co_research(data);
      console.log("testInsert ..........", res.data);
      co_researcher_id.push(res.data.id);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async function insert(subconcept, studyarea, network) {
    console.log("Start...............");

    for (const item of subconcept) {
      await insertsubconcept(item);
    }
    await insertstudyarea(studyarea);
    await insertnetwork(network);

    console.log("Done!111111"); //1
  }

  const handleSubmit = () => {
    const data = {
      co_researcher_name_th,
      co_researcher_group_id,
      coordinator_name_th,
      co_researcher_phone,
      co_researcher_latitude,
      co_researcher_longitude,
    };

    insert(props.subconcept, props.studyarea, data).then(() => {
      console.log("...subconcept: ", concpt_proposal_sub);
      console.log("...IdCo ", co_researcher_id);
      const newdataconcept = {
        concpt_proposal_sub,
        co_researcher_id,
        project_type_id,
        concept_proposal_name,
        source_funds_id,
        concept_year,
        concept_budget,
        concept_univercity_budget,
        concept_leader,
        concept_phone,
        concept_proposal_type,
      };
      console.log("testNewConcept2 :", concpt_proposal_sub); //4
      props.insertconcept(newdataconcept).then(() => {
        props.clearconcept();
        props.history.push("/");
      }); //2
    });
    console.log("end............. ");
    console.log("..............3", props.insertIDsubconcept);
  };
  return (
    <React.Fragment>
      <Form>
        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body card-body-pading">
          <h5 style={{ textAlign: "left" }}>เครือข่าย</h5>
        </div>
        <div className="card-body card-body-pading">
          <Row>
            {/* ชุมชน */}
            <Col lg={7}>
              <div className="form-group">
                <Form.Label>ชื่อชุมชน</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setco_researcher_name_th(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกชื่อโครงการ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* ประเภทเครือข่าย */}
            <Col lg={5}>
              <div className="form-group">
                <Form.Label>ประเภท</Form.Label>
                <select
                  required
                  className="form-control"
                  onChange={(event) => {
                    setco_researcher_group_id(event.target.value);
                  }}
                >
                  {
                    props.network.length === 0 ? (
                      <option value="">เลือกประเภท</option>
                    ) : null
                    // <option value={props.concept.project_type_id}>
                    //   {
                    //     props.project_type[
                    //       parseInt(props.concept.project_type_id)
                    //     ].project_type_name
                    //   }
                    // </option>
                  }
                  {props.co_research_group.length > 0 ? (
                    <>
                      {props.co_research_group.map((value, i) => {
                        return (
                          <option key={i} value={value.co_researcher_group_id}>
                            {value.co_researcher_group_name_th}
                          </option>
                        );
                      })}
                    </>
                  ) : null}
                </select>
              </div>
            </Col>
            {/* ผู้ประสานงาน */}
            <Col lg={8}>
              <div className="form-group">
                <Form.Label>ผู้ประสานงาน</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setcoordinator_name_th(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกหน่วยงานเจ้าของโครงการ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* เบอร์ติดต่อ */}
            <Col lg={4}>
              <div className="form-group">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setco_researcher_phone(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกหน่วยงานเจ้าของโครงการ
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* Lat */}
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={co_researcher_latitude}
                  onChange={(event) => {
                    setco_researcher_latitude(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกพื้นที่ศึกษา ( Latitude )
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* Long */}
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={co_researcher_longitude}
                  onChange={(event) => {
                    setco_researcher_longitude(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <h6 style={{ marginTop: "0.7rem" }}>
                    ** โปรดกรอกพื้นที่ศึกษา ( Longitude )
                  </h6>
                </Form.Control.Feedback>
              </div>
            </Col>
            {/* Map */}
            <Col lg={12}>
              {co_researcher_latitude === 0 && co_researcher_longitude === 0 ? (
                <MapContainer
                  center={[13.769364414654232, 100.53581597467847]}
                  zoom={7}
                  style={{ height: "40vh" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapConsumer>
                    {(map) => {
                      map.on("click", function (e) {
                        const { lat, lng } = e.latlng;
                        setco_researcher_latitude(lat);
                        setco_researcher_longitude(lng);
                        L.marker([lat, lng], { icon }).addTo(map);
                      });
                      return null;
                    }}
                  </MapConsumer>
                </MapContainer>
              ) : (
                <MapContainer
                  center={[co_researcher_latitude, co_researcher_longitude]}
                  zoom={4}
                  style={{ height: "40vh" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker
                    position={[co_researcher_latitude, co_researcher_longitude]}
                    icon={icon}
                  ></Marker>
                  <MapConsumer>
                    {(map) => {
                      map.on("click", function (e) {
                        const { lat, lng } = e.latlng;
                        setco_researcher_latitude(lat);
                        setco_researcher_longitude(lng);
                        L.marker([lat, lng], { icon }).addTo(map);
                      });
                      map.flyTo(
                        [co_researcher_latitude, co_researcher_longitude],
                        map.getZoom()
                      );
                      return null;
                    }}
                  </MapConsumer>
                </MapContainer>
              )}
            </Col>
          </Row>
        </div>
        <div
          className="card-footer"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <Row style={{ padding: "0 5rem" }}>
            <Col lg={6} style={{ float: "left" }}>
              <NavLink
                className="btn bg-gradient-primary btn-md"
                to="/research/studyarea"
              >
                ย้อนกลับ
              </NavLink>
            </Col>
            <Col lg={6} style={{ textAlign: "right" }}>
              <Button
                // type="submit"
                onClick={handleSubmit}
                className="btn bg-gradient-primary btn-md"
              >
                บันทึก
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    concept: state.concept.concept,
    subconcept: state.concept.subconcept,
    studyarea: state.concept.studyarea,
    network: state.concept.network,
    co_research_group: state.concept.co_research_group,
  };
};

export default connect(mapStateToProps, {
  addconcept,
  addnetwork,
  get_co_research_group,
  insertconcept,
  clearconcept,
})(Network);
