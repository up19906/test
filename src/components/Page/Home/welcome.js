import React from "react";
import { Row, Col } from "react-bootstrap";
export default function welcome() {
  var d = new Date();
  var monthNamesThai = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤษจิกายน",
    "ธันวาคม",
  ];
  var dayNames = [
    "วันอาทิตย์ที่",
    "วันจันทร์ที่",
    "วันอังคารที่",
    "วันพุทธที่",
    "วันพฤหัสบดีที่",
    "วันศุกร์ที่",
    "วันเสาร์ที่",
  ];
  return (
    <Row>
      <Col lg={12}>
        <div
          className="card card-primary card-outline"
          style={{ textAlign: "center" }}
        >
          <div className="card-body">
            <h4>ยินดีต้อนรับ</h4>
            <h5>เข้าใช้งานระบบบันทึกข้อมูลศักยภาพงานวิจัย</h5>
            <h6 className="card-text">
              {dayNames[d.getDay()] +
                "  " +
                d.getDate() +
                " " +
                monthNamesThai[d.getMonth()] +
                "  " +
                (d.getFullYear() + 543) +
                " เวลา " +
                d.getHours() +
                "." +
                d.getMinutes() +
                " น."}
            </h6>
          </div>
        </div>
      </Col>
    </Row>
  );
}
