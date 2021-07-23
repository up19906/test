/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import $ from "jquery";

import "./style.scss";

export default function Header() {
  const [sidebar, setSidebar] = useState(false);
  const [submenu, setsubmenu] = useState(true);
  const [menu, setmenu] = useState(false);

  const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(!sidebar);
      setmenu(false);
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
    } else {
      setSidebar(!sidebar);
      setmenu(true);
      document.querySelector(".sidebar-mini").classList.add("sidebar-collapse");
      document.querySelector(".content-wrapper").classList.add("content-side");
      document.querySelector(".main-footer").classList.add("content-side");
      document
        .querySelector(".main-sidebar")
        .classList.add("main-sidebar-open");
    }
  };

  const openMenu = () => {
    if (submenu) {
      setsubmenu(!submenu);
      document.querySelector(".nav_link_add").classList.add("menu-open");
      document.querySelector(".nav_link_add").classList.add("menu-is-opening");
      document
        .querySelector(".nav_treeview_add")
        .classList.add("navteameview_open");
    } else {
      setsubmenu(!submenu);
      document.querySelector(".nav_link_add").classList.remove("menu-open");
      document
        .querySelector(".nav_link_add")
        .classList.remove("menu-is-opening");
      document
        .querySelector(".nav_treeview_add")
        .classList.remove("navteameview_open");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="wraper">
      <div
        className={`offcanvas-menu-overlay ${menu && "active"}`}
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
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <NavLink to="/" className="brand-link">
            <Image
              src="https://af.surin.rmuti.ac.th/Quota/Registration/img/RMUTI-logo-color.png"
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
                    <div className="image">
                      <Image
                        className="img-circle elevation-2"
                        src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
                        alt="User Image"
                      />
                    </div>
                    <div className="info">
                      <a href="/" className="d-block">
                        Alexander Pierce
                      </a>
                    </div>
                  </div>
                  <nav className="mt-2">
                    <ul
                      className="nav nav-pills nav-sidebar flex-column"
                      data-widget="treeview"
                      role="menu"
                      data-accordion="false"
                    >
                      <li className="nav-item">
                        <a href="/" className="nav-link">
                          <i className="nav-icon fas fa-home" />
                          <p>
                            หน้าแรก
                            {/* <span className="right badge badge-danger">
                              New
                            </span> */}
                          </p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#"
                          className="nav-link nav_link_add "
                          onClick={() => openMenu()}
                        >
                          <i className="nav-icon fas fa-plus-circle" />
                          <p>
                            เพิ่มข้อมูลแหล่งทุน
                            {submenu === true ? (
                              <i className="right fas fa-angle-left" />
                            ) : (
                              <i className="right fas fa-angle-down" />
                            )}
                          </p>
                        </a>
                        {/* start */}
                        <ul
                          className="nav nav-treeview nav_treeview_add "
                          // style={{ display: "block" }}
                        >
                          <li className="nav-item">
                            <NavLink
                              to="/addfunding/fundingresearch"
                              className="nav-link"
                            >
                              <i className="far fas fa-angle-right nav-icon" />
                              <p>แหล่งทุนงานวิจัย</p>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/addfunding/academic"
                              className="nav-link"
                            >
                              <i className="far fas fa-angle-right nav-icon" />
                              <p>แหล่งทุนงานบริการวิชาการ</p>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/addfunding/aboutfunding"
                              className="nav-link"
                            >
                              <i className="far fas fa-angle-right nav-icon" />
                              <p>ข้อมูลทั่วไปเกี่ยวกับทุน</p>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/addfunding/research"
                              className="nav-link"
                            >
                              <i className="far fas fa-angle-right nav-icon" />
                              <p>งานวิจัย</p>
                            </NavLink>
                          </li>
                        </ul>
                        {/* // end  */}
                      </li>{" "}
                      <li className="nav-item">
                        <a href="/uptest/allreport" className="nav-link">
                          <i className="nav-icon 	fas fa-file-alt" />
                          <p>
                            AllReport
                            <i className="right fas fa-angle-left" />
                          </p>
                        </a>
                        {/* ติดไว้ก่อน ค่อยทำ */}
                        <ul
                          className="nav nav-treeview nav_treeview_add "
                          // style={{ display: "block" }}
                        >
                          <li className="nav-item">
                            <NavLink to="/addfunding" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>แหล่งทุนงานวิจัย</p>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/addfunding/academic"
                              className="nav-link"
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>แหล่งทุนงานบริการวิชาการ</p>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/addfunding/aboutfunding"
                              className="nav-link"
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>ข้อมูลทั่วไปเกี่ยวกับทุน</p>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/addfunding/research"
                              className="nav-link"
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>งานวิจัย</p>
                            </NavLink>
                          </li>
                        </ul>
                        {/* ติดไว้ก่อน ค่อยทำ */}
                      </li>
                      <li className="nav-item">
                        <a href="/" className="nav-link">
                          <i className="nav-icon fas fa-sign-out-alt" />
                          <p>
                            ออกจากระบบ
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                        {/* <ul
                          className="nav nav-treeview"
                          style={{ display: "none" }}
                        >
                          <li className="nav-item">
                            <a
                              href="pages/UI/general.html"
                              className="nav-link"
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>General</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="pages/UI/icons.html" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Icons</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="pages/UI/buttons.html"
                              className="nav-link"
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>Buttons</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="pages/UI/sliders.html"
                              className="nav-link"
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>Sliders</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="pages/UI/modals.html" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Modals &amp; Alerts</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="pages/UI/navbar.html" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Navbar &amp; Tabs</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="pages/UI/timeline.html"
                              className="nav-link"
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>Timeline</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="pages/UI/ribbons.html"
                              className="nav-link"
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>Ribbons</p>
                            </a>
                          </li>
                        </ul>
                      */}
                      </li>
                    </ul>
                  </nav>
                  {/* /.sidebar-menu */}
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
