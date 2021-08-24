/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./Treeview";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  openmenu,
  closemenu,
  opensidebar,
  closesidebar,
} from "../../redux/header/action";

// import { getuserlogin } from "../../redux/home/action";
import { connect } from "react-redux";

import * as $ from "jquery";
import * as AdminLte from "admin-lte";

import ApiData from "../../api/index";

import "./style.scss";

function Header(props) {
  // const [submenu, setsubmenu] = useState(true);

  const [currentUser, setCurrentUser] = useState({});

  const processUser = () => {
    const parameters = window.location.search.substring(1).split("&");
    const temp = parameters[0].split("=");
    const uid = unescape(temp[1]);
    // console.log("testuser....",uid);
    // var temp2 = parameters[1].split("=");
    // const p = unescape(temp2[1]);
    return uid;
  };

  const saveDatatoStorage = (uid) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: uid,
      })
    );
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  async function getUser(uid) {
    try {
      const response = await ApiData.getuserlogin(uid);
      setCurrentUser({ ...currentUser, ...response.data });
      return Promise.resolve(response.data);
    } catch (e) {
      Promise.reject(e);
      console.log(e);
    }
  }

  async function login() {
    if (getCurrentUser() === null || getCurrentUser().uid === "undefined") {
      const data = processUser();
      saveDatatoStorage(data);
    }
    if (getCurrentUser().uid === "undefined") {
      window.location.href =
        "https://www.km-innovations.rmuti.ac.th/researcher/";
    }
    const user = getCurrentUser();
    console.log("Param :", processUser().uid);

    if (user.uid !== processUser().uid) {
      const data = processUser();
      saveDatatoStorage(data);
    }
    console.log("User...!!", user);
    await getUser(user.uid);
    console.log("userDetail", currentUser);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    login();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "https://www.km-innovations.rmuti.ac.th/researcher/";
  };

  const openCloseSidebar = () => {
    if (props.sidebar === false) {
      // setSidebar(!sidebar);
      // setmenu(false);
      props.closesidebar();
      // props.opensidebar();
      props.closemenu();
      document
        .querySelector(".sidebar-mini")
        .classList.remove("sidebar-collapse");
      document
        .querySelector(".content-wrapper")
        .classList.remove("content-side");
      document.querySelector(".main-footer").classList.remove("content-side");
      document
        .querySelector(".main-sidebar")
        .classList.remove("main-sidebar-open");
    } else if (props.sidebar === true) {
      // setSidebar(!sidebar);
      console.log("testmenu:", props.sidebar);
      props.opensidebar();
      props.openmenu();
      document.querySelector(".sidebar-mini").classList.add("sidebar-collapse");
      document.querySelector(".content-wrapper").classList.add("content-side");
      document.querySelector(".main-footer").classList.add("content-side");
      document
        .querySelector(".main-sidebar")
        .classList.add("main-sidebar-open");
    }
  };

  // const openMenu = () => {
  //   if (submenu) {
  //     setsubmenu(!submenu);
  //     document.querySelector(".nav_link_add").classList.add("menu-open");
  //     document.querySelector(".nav_link_add").classList.add("menu-is-opening");
  //     document
  //       .querySelector(".nav_treeview_add")
  //       .classList.add("navteameview_open");
  //   } else {
  //     setsubmenu(!submenu);
  //     document.querySelector(".nav_link_add").classList.remove("menu-open");
  //     document
  //       .querySelector(".nav_link_add")
  //       .classList.remove("menu-is-opening");
  //     document
  //       .querySelector(".nav_treeview_add")
  //       .classList.remove("navteameview_open");
  //   }
  // };



  console.log("test .......", currentUser);



  return (
    <div className="wraper">
      <div
        className={`offcanvas-menu-overlay ${props.menu && "active"}`}
        onClick={() => openCloseSidebar()}
      />
      <body className="hold-transition sidebar-mini">
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <div
                className="nav-link"
                data-widget="pushmenu"
                onClick={() => openCloseSidebar()}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-bars" />
              </div>
            </li>
          </ul>
          {/* SEARCH FORM */}
        </nav>
        {/* /.navbar */}
        {/* transition: margin-left .3s ease-in-out,width .3s ease-in-out; */}
        <aside
          className="main-sidebar sidebar-dark-primary elevation-4"
          style={{ fontSize: "14px" }}
        >
          {/* Brand Logo */}
          <NavLink to="/home" className="brand-link">
            <Image
              src="https://www.km-innovations.rmuti.ac.th/researcher/images/rmuti"
              alt="AdminLTE Logo"
              className="brand-image "
              style={{
                opacity: ".8",
                marginLeft: "1.2rem",
                marginRight: "2rem",
              }}
            />
            <span className="brand-text font-weight-light">RMUTI</span>
          </NavLink>
          {/* Sidebar */}
          <div className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-transition os-host-scrollbar-horizontal-hidden">
            <div className="os-resize-observer-host observed">
              <div
                className="os-resize-observer"
                style={{ left: 0, right: "auto" }}
              />
            </div>
            <div
              className="os-size-auto-observer observed"
              style={{ height: "calc(100% + 1px)", float: "left" }}
            >
              <div className="os-resize-observer" />
            </div>
            <div
              className="os-content-glue"
              style={{ margin: "0px -8px", width: 249, height: 911 }}
            />
            <div className="os-padding">
              <div
                className="os-viewport os-viewport-native-scrollbars-invisible"
                style={{ overflowY: "scroll" }}
              >
                <div
                  className="os-content"
                  style={{
                    padding: "0px 8px",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {/* Sidebar user panel (optional) */}

                  <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    {/* <div className="image">
                        <Image
                          className="img-circle elevation-2"
                          src="https://image.flaticon.com/icons/png/512/219/219986.png"
                          alt="User Image"
                        />
                      </div> */}
                    <div className="info">
                      <a
                        href="https://www.km-innovations.rmuti.ac.th/researcher/researcher/profile"
                        className="nav-link d-block"
                      >
                        {currentUser.user_first_name_th +
                          " " +
                          currentUser.user_last_name_th}
                      </a>
                    </div>
                  </div>
                  {currentUser.group_id === 3 ? (
                    <nav className="mt-2">
                      <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                      >
                        <li className="nav-item">
                          <NavLink to="/home" className="nav-link">
                            <i className="nav-icon fas fa-home" />
                            <p>
                              หน้าแรก
                              {/* <span className="right badge badge-danger">
           New
         </span> */}
                            </p>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <a
                            href="https://www.km-innovations.rmuti.ac.th/researcher/researcher/profile"
                            className="nav-link"
                          >
                            <i className="nav-icon fas fa-users" />
                            <p>
                              ข้อมูลส่วนตัว
                            </p>
                          </a>
                        </li>
                        <li className="nav-item ">
                          <a href="#" className="nav-link">
                            <i className="nav-icon fas fa-file-pdf" />
                            <p>
                              เพิ่มข้อมูลแหล่งทุน
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav-treeview">
                            <li className="nav-item">
                              <NavLink
                                to="/addfunding/addfundingresearch"
                                className="nav-link"
                              >
                                <i className="far fa-file-pdf nav-icon" />
                                <p>แหล่งทุนงานวิจัย</p>
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                to="/addfunding/aboutfunding"
                                className="nav-link"
                              >
                                <i className="far fa-file nav-icon" />
                                <p>ข้อมูลทั่วไปเกี่ยวกับทุน</p>
                              </NavLink>
                            </li>
                          </ul>
                        </li>

                        <li className="nav-item">
                          <NavLink
                            to="/conceptproposal"
                            className="nav-link"
                            // onClick={() => openMenu(false)}
                          >
                            <i className="nav-icon 	fas fa-file" />
                            <p>ข้อเสนอโครงการ</p>
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink to="/allreport" className="nav-link">
                            <i className="nav-icon 	fas fa-file-alt" />
                            <p>
                              AllReport
                              {/* <i className="right fas fa-angle-left" /> */}
                            </p>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            style={{ cursor: "pointer" }}
                            onClick={logout}
                          >
                            <i className="nav-icon fas fa-sign-out-alt" />
                            <p>
                              ออกจากระบบ
                              {/* <i className="fas fa-angle-left right" /> */}
                            </p>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  ) : (
                    <nav className="mt-2">
                      <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                      >
                        <li className="nav-item">
                          <a
                            href="<?php echo base_url('researcher/budget/Proposal'); ?>"
                            className="nav-link"
                          >
                            <i className="nav-icon fas fa-hand-holding-usd" />
                            <p>ทุนวิจัย</p>
                          </a>
                        </li>
                        <li className="nav-item ">
                          <a href="#" className="nav-link">
                            <i className="nav-icon fas fa-users" />
                            <p>
                              ข้อมูลส่วนตัว
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav-treeview">
                            <li className="nav-item">
                              <a
                                href="<?php echo base_url('researcher/profile'); ?>"
                                className="nav-link"
                              >
                                <i className="far fa-user nav-icon" />
                                <p>ข้อมูลส่วนตัว</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                <i className="far fa-id-card nav-icon" />
                                <p>
                                  ประวัติส่วนตัว
                                  <i className="right fas fa-angle-left" />
                                </p>
                              </a>
                              <ul className="nav-treeview">
                                <li className="nav-item">
                                  <a
                                    href="<?php echo base_url('researcher/education'); ?>"
                                    className="nav-link"
                                  >
                                    <i className="far fa-dot-circle nav-icon" />
                                    <p>ประวัติการศึกษา</p>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="<?php echo base_url('researcher/working'); ?>"
                                    className="nav-link"
                                  >
                                    <i className="far fa-dot-circle nav-icon" />
                                    <p>ประวัติการทำงาน</p>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="<?php echo base_url('researcher/expertise'); ?>"
                                    className="nav-link"
                                  >
                                    <i className="far fa-dot-circle nav-icon" />
                                    <p>ความเชี่ยวชาญ</p>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="<?php echo base_url('researcher/attention'); ?>"
                                    className="nav-link"
                                  >
                                    <i className="far fa-dot-circle nav-icon" />
                                    <p>ความสนใจ</p>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                <i className="fas fa-briefcase nav-icon" />
                                <p>
                                  งานวิจัย
                                  <i className="right fas fa-angle-left" />
                                </p>
                              </a>
                              <ul className="nav-treeview">
                                <li className="nav-item">
                                  <a
                                    href="<?php echo base_url('researcher/project'); ?>"
                                    className="nav-link"
                                  >
                                    <i className="far fa-dot-circle nav-icon" />
                                    <p>งานวิจัย</p>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="<?php echo base_url('researcher/publication'); ?>"
                                    className="nav-link"
                                  >
                                    <i className="far fa-dot-circle nav-icon" />
                                    <p>ผลงานตีพิมพ์</p>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="<?php echo base_url('researcher/researcher'); ?>"
                                    className="nav-link"
                                  >
                                    <i className="far fa-dot-circle nav-icon" />
                                    <p>ผู้ร้วมงานวิจัย</p>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                <i className="fas fa-award nav-icon" />
                                <p>
                                  ใบประกาศ / รางวัล
                                  <i className="right fas fa-angle-left" />
                                </p>
                              </a>
                              <ul className="nav-treeview">
                                <li className="nav-item">
                                  <a
                                    href="<?php echo base_url('researcher/certificate'); ?>"
                                    className="nav-link"
                                  >
                                    <i className="far fa-dot-circle nav-icon" />
                                    <p>ใบประกาศ / ใบรับรอง</p>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="<?php echo base_url('researcher/patent'); ?>"
                                    className="nav-link"
                                  >
                                    <i className="far fa-dot-circle nav-icon" />
                                    <p>สิทธิบัตร</p>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="<?php echo base_url('researcher/award'); ?>"
                                    className="nav-link"
                                  >
                                    <i className="far fa-dot-circle nav-icon" />
                                    <p>รางวัล</p>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item ">
                          <a href="#" className="nav-link">
                            <i className="nav-icon fas fa-file-pdf" />
                            <p>
                              รายงานความก้าวหน้า
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav-treeview">
                            <li className="nav-item">
                              <a
                                href="<?php echo base_url('report/research'); ?>"
                                className="nav-link"
                              >
                                <i className="far fa-file-pdf nav-icon" />
                                <p>งานวิจัย</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="<?php echo base_url('report/academic'); ?>"
                                className="nav-link"
                              >
                                <i className="far fa-file nav-icon" />
                                <p>งานบริการวิชาการ</p>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item has-treeview">
                          <a href="#" className="nav-link">
                            <i className="nav-icon fas fa-file" />
                            <p>
                              ข้อเสนอรอผลการพิจารณา
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav nav-treeview">
                            <li className="nav-item">
                              <a
                                href="<?php echo base_url('report/research/waitresearch'); ?>"
                                className="nav-link"
                              >
                                <i className="far fa-file-pdf nav-icon" />
                                <p>งานวิจัย</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="<?php echo base_url('report/academic/waitacademic'); ?>"
                                className="nav-link"
                              >
                                <i className="far fa-file nav-icon" />
                                <p>งานบริการวิชาการ</p>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            </div>
            <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
              <div className="os-scrollbar-track">
                <div
                  className="os-scrollbar-handle"
                  style={{ width: "100%", transform: "translate(0px, 0px)" }}
                />
              </div>
            </div>
            <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
              <div className="os-scrollbar-track">
                <div
                  className="os-scrollbar-handle"
                  style={{
                    height: "77.027%",
                    transform: "translate(0px, 0px)",
                  }}
                />
              </div>
            </div>
            <div className="os-scrollbar-corner" />
          </div>
          {/* /.sidebar */}
        </aside>
      </body>
    </div>
  );
}

const mapStateToProps = (state) => ({
  menu: state.header.menu,
  sidebar: state.header.sidebar,
  userlogin: state.statehome.userlogin,
});
const mapDispatchToProps = (dispatch) => ({
  openmenu: () => dispatch(openmenu()),
  closemenu: () => dispatch(closemenu()),
  opensidebar: () => dispatch(opensidebar()),
  closesidebar: () => dispatch(closesidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
