/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import Axios from "axios";

export default function AddAboutResearch() {
  var date = new Date();
  var today =
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-") +
    " " +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
  console.log("testdate:string", today);

  const [about_finding, setabout_finding] = useState([]);
  const [about_fundingagency_name, setabout_fundingagency_name] = useState(""); //ชื่อทุน
  const [about_fundingagency_institution, setabout_fundingagency_institution] =
    useState(""); //หน่วยงาน
  const [about_fundingagency_paln_master, setabout_fundingagency_paln_master] =
    useState(""); //แผนหลัก
  const [about_fundingagency_paln_sub, setabout_fundingagency_paln_sub] =
    useState(""); //แผนรอง
  const [about_fundingagency_platform, setabout_fundingagency_platform] =
    useState(""); //แฟลตฟอร์ม
  const [about_fundingagency_program, setabout_fundingagency_program] =
    useState(0); //โปรแกรม
  const [about_fundingagency_point, setabout_fundingagency_point] =
    useState(""); //ประเด็นเริ่มสำคัญ
  const [about_fundingagency_goal, setabout_fundingagency_goal] = useState(""); //เป้าหมาย
  // const [create_date, setCreate_date] = useState("");
  const [
    about_fundingagency_achievement_main,
    setabout_fundingagency_achievement_main,
  ] = useState(""); //ผลสัมถฤทธิ์ที่สำคัญ หลัก
  const [
    about_fundingagency_achievement_small,
    setabout_fundingagency_achievement_small,
  ] = useState(""); //ผลสัมถฤทธิ์ที่สำคัญ รอง

  //   const [modalShow, setModalShow] = React.useState(false);
  //   const [source_funds_name, setSource_funds_name] = useState("");

  //   const [source_funds, setSource_fund] = useState([]);

  //   useEffect(() => {
  //     Axios.get("http://localhost:3002/api/get/source_funds").then((source) => {
  //       setSource_fund(source.data);
  //     });
  //   }, []);

  const handleSubmit = () => {
    const fundingagencyObj = {
      about_fundingagency_name: about_fundingagency_name,
      about_fundingagency_institution: about_fundingagency_institution,
      about_fundingagency_paln_master: about_fundingagency_paln_master,
      about_fundingagency_paln_sub: about_fundingagency_paln_sub,
      about_fundingagency_platform: about_fundingagency_platform,
      about_fundingagency_program: about_fundingagency_program,
      about_fundingagency_point: about_fundingagency_point,
      about_fundingagency_goal: about_fundingagency_goal,
      about_fundingagency_achievement_main:
        about_fundingagency_achievement_main,
      about_fundingagency_achievement_small:
        about_fundingagency_achievement_small,
    };
    Axios.post(
      "http://localhost:4000/api/post/coordinator_about_fundingagency",
      fundingagencyObj
    ).then(() => {
      setabout_finding([
        ...about_finding,
        {
          about_fundingagency_name: about_fundingagency_name,
          about_fundingagency_institution: about_fundingagency_institution,
          about_fundingagency_paln_master: about_fundingagency_paln_master,
          about_fundingagency_paln_sub: about_fundingagency_paln_sub,
          about_fundingagency_platform: about_fundingagency_platform,
          about_fundingagency_program: about_fundingagency_program,
          about_fundingagency_point: about_fundingagency_point,
          about_fundingagency_goal: about_fundingagency_goal,
          about_fundingagency_achievement_main:
            about_fundingagency_achievement_main,
          about_fundingagency_achievement_small:
            about_fundingagency_achievement_small,
          created_date: today,
        },
      ]);
    });
    alert("บันทึกข้อมูลสำเร็จ!!");
  };
  return (
    <>
      <div className="card-header">
        <NavLink to="/addfunding/fundingresearch">
          <button
            className="btn btn-primary btn-fundingresearch card-header-menu"
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
            className="btn btn-primary btn-acdemic card-header-menu"
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
            className="btn  btn-about card-header-menu"
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              document
                .querySelector(".btn-fundingresearch ")
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
            className="btn btn-primary btn-research card-header-menu"
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
        <div className="card-body card-body-pading">
          <Row>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="type_source">ชื่อทุน</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setabout_fundingagency_name(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">หน่วยงาน</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setabout_fundingagency_institution(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">แผนงานหลัก</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setabout_fundingagency_paln_master(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">แผนงานรอง</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setabout_fundingagency_paln_sub(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">แพลตฟอร์ม</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setabout_fundingagency_platform(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div> */}
            <Col lg={6}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">โปรแกรม</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setabout_fundingagency_program(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">ประเด็นเริ่มสำคัญ</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setabout_fundingagency_point(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">เป้าหมาย </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setabout_fundingagency_goal(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  ผลสัมถฤทธิ์ที่สำคัญ (หลัก)
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setabout_fundingagency_achievement_main(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  ผลสัมถฤทธิ์ที่สำคัญ (รอง)
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setabout_fundingagency_achievement_small(
                      event.target.value
                    );
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
            <Col>
              <div className="center">
                <Button
                  onClick={handleSubmit}
                  // href="/"
                  type="submit"
                  className="btn  bg-gradient-primary btn-md"
                >
                  บันทึก
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </form>
    </>
  );
}
