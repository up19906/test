import React, { Component } from "react";

import iconmap from "../../../assets/images/maps-and-flags-50.png";

export let longdo;
export let map;

export class LongdoMap extends Component {
  constructor(props) {
    super(props);
    this.mapCallback = this.mapCallback.bind(this);
  }

  mapCallback() {
    longdo = window.longdo;
    map = new window.longdo.Map({
      placeholder: document.getElementById(this.props.id),
      language: "en",
      zoom: 6,
      lastView: false,
      location: { lat: 14.987711, lon: 102.117727 },
    });
  }

  componentDidMount() {
    const existingScript = document.getElementById("longdoMapScript");
    const callback = this.props.callback;

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://api.longdo.com/map/?key=${this.props.mapKey}`;
      script.id = "longdoMapScript";
      document.body.appendChild(script);

      script.onload = () => {
        this.mapCallback();
        if (callback) callback();
      };
    }

    if (existingScript) this.mapCallback();
    if (existingScript && callback) callback();
    // map.Event.bind("overlayClick", function (marker) {
    //   //เปิดการใข้งาน event 'overlayClick' ซึ่งจะเรียกฟังค์ชั่นทุกครั้งที่มีการคลิก overlay และตั้งชื่อ overlay ที่ถูกคลิกว่า markerSelect
    //   map.Overlays.remove(marker); //remove overlay ที่ชื่อว่า markerSelect
    // });
    map.Event.bind("click", function () {
      //เปิดการใช้งาน event 'click' ซึ่งจะเรียกฟังค์ชั่นทุกครั้งที่มีการคลิกบน map
      var location = map.location("POINTER");
      const marker = new longdo.Marker(
        location, //สร้าง Marker ซึ่งเป็น longdo object โดยลิ้งค์icon ไปที่รูปรถบรรทุก และตั้งค่าให้ คลิก/ลาก ได้
        {
          icon: {
            url: "https://www.km-innovations.rmuti.ac.th/researcher/images/maps-and-flags-50.png",
          },
          clickable: true,
          draggable: false,
        }
      );
      //map.Overlays.remove(marker);
      map.Overlays.add(marker);
      document.getElementById("latitude").value = location.lat;
      document.getElementById("longitude").value = location.lon;
    });
  }

  render() {
    return (
      <React.Fragment>
        <div id={this.props.id} style={{ width: "100%", height: "100%" }}></div>
        <div id="result"></div>
      </React.Fragment>
    );
  }
}
