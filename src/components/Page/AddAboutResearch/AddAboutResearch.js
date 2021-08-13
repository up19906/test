import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { insertsource_fund, clearfunding } from "../../../redux/funding/action";

function AddAboutResearch(props) {
  const [source_funds_name, setsource_funds_name] = useState(""); //ชื่อทุน
  const [source_funds_institution, setsource_funds_institution] = useState(""); //หน่วยงาน
  const [source_funds_paln_master, setsource_funds_paln_master] = useState(""); //แผนหลัก
  const [source_funds_paln_sub, setsource_funds_paln_sub] = useState(""); //แผนรอง
  const [source_funds_platform, setsource_funds_platform] = useState(""); //แฟลตฟอร์ม
  const [source_funds_program, setsource_funds_program] = useState(0); //โปรแกรม
  const [source_funds_point, setsource_funds_point] = useState(""); //ประเด็นเริ่มสำคัญ
  const [source_funds_goal, setsource_funds_goal] = useState(""); //เป้าหมาย
  const [source_funds_achievement_main, setsource_funds_achievement_main] =
    useState(""); //ผลสัมถฤทธิ์ที่สำคัญ หลัก
  const [source_funds_achievement_small, setsource_funds_achievement_small] =
    useState(""); //ผลสัมถฤทธิ์ที่สำคัญ รอง

  const handleSubmit = () => {
    const newdata = {
      source_funds_name,
      source_funds_institution,
      source_funds_paln_master,
      source_funds_paln_sub,
      source_funds_platform,
      source_funds_program,
      source_funds_point,
      source_funds_goal,
      source_funds_achievement_main,
      source_funds_achievement_small,
    };
    props.insertsource_fund(newdata).then(() => {
      alert("บันทึกข้อมูล สำเร็จ");
      props.history.push("/addfunding/addfundingresearch");
    });
  };
  return (
    <React.Fragment>
      <div className="card-header">
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
                    setsource_funds_name(event.target.value);
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
                    setsource_funds_institution(event.target.value);
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
                    setsource_funds_paln_master(event.target.value);
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
                    setsource_funds_paln_sub(event.target.value);
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
                    setsource_funds_platform(event.target.value);
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
                    setsource_funds_program(event.target.value);
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
                    setsource_funds_point(event.target.value);
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
                    setsource_funds_goal(event.target.value);
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
                    setsource_funds_achievement_main(event.target.value);
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
                    setsource_funds_achievement_small(event.target.value);
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
                  // type="submit"
                  className="btn  bg-gradient-primary btn-md"
                >
                  บันทึก
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    researchfaculty: state.funding.researchfaculty,
    budgettype: state.funding.budgettype,
    fundingstatus: state.funding.fundingstatus,
    year: state.concept.year,
    concept: state.concept.concept,
    user: state.concept.user,
    source_funds: state.concept.sourcefund,
    project_type: state.concept.projecttype,
  };
};

export default connect(mapStateToProps, {
  insertsource_fund,
  clearfunding,
})(withRouter(AddAboutResearch));
