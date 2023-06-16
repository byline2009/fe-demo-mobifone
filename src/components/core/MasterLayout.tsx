import React, { useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { Link, Outlet } from "react-router-dom";

import {
  chatbubbleOutline,
  homeOutline,
  helpOutline,
  settingsOutline,
  personOutline,
  lockClosedOutline,
  logOutOutline,
  menuOutline,
  searchOutline,
} from "ionicons/icons";

const MasterLayout: React.FC = ({ children }) => {
  useEffect(() => {
    if (document) {
      let list = document.querySelectorAll(".navigation li");
      list.forEach((object) => {
        object.addEventListener("click", () => {
          list.forEach((item) => {
            item.classList.remove("active");
            object.classList.add("active");
          });
        });
      });
    }
  }, []);
  useEffect(() => {
    const pathnames = window.location.pathname.split("/");
    console.log("pathnames", pathnames);
    let element;
    switch (pathnames[1]) {
      case "nhan-vien-nghi-viec":
        element = document.getElementById("menu-employee-off");
        element?.classList.add("active");
        break;
      case "dashboard":
        element = document.getElementById("menu-dashboard");
        element?.classList.add("active");
        break;
      case "ptm":
        element = document.getElementById("menu-ptm");
        element?.classList.add("active");
        break;
      case "cs":
        element = document.getElementById("menu-cs");
        element?.classList.add("active");
        break;
      default:
        break;
    }
  }, []);
  const toggleOnClick = () => {
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    navigation?.classList.toggle("active");
    main?.classList.toggle("active");
  };
  return (
    <div className="container-warper">
      <div className="navigation">
        <ul>
          <li className="title-sidebar">
            <h4>Báo cáo Sản Phẩm Dịch Vụ</h4>
          </li>
          <li id="menu-dashboard">
            <Link className="menu-link" to={`dashboard`}>
              <span className="icon">
                <IonIcon className="ion-icon" icon={homeOutline}></IonIcon>
              </span>
              <span className="title">DashBoard</span>
            </Link>
          </li>
          <li id="menu-employee-off">
            <Link className="menu-link" to={`nhan-vien-nghi-viec`}>
              <span className="icon">
                <IonIcon className="ion-icon" icon={personOutline}></IonIcon>
              </span>
              <span className="title">Nhân viên nghỉ việc</span>
            </Link>
          </li>
          <li id="menu-ptm">
            <Link className="menu-link" to={`ptm`}>
              <span className="icon">
                <IonIcon
                  className="ion-icon"
                  icon={chatbubbleOutline}
                ></IonIcon>
              </span>
              <span className="title">Phát triển mới</span>
            </Link>
          </li>
          <li id="menu-cs">
            <Link className="menu-link" to={`cs`}>
              <span className="icon">
                <IonIcon
                  className="ion-icon"
                  icon={chatbubbleOutline}
                ></IonIcon>
              </span>
              <span className="title">Duy trì</span>
            </Link>
          </li>
          <li>
            <Link className="menu-link" to={`/`}>
              <span className="icon">
                <IonIcon className="ion-icon" icon={helpOutline}></IonIcon>
              </span>
              <span className="title">Help</span>
            </Link>
          </li>
          <li>
            <Link className="menu-link" to={`/`}>
              <span className="icon">
                <IonIcon className="ion-icon" icon={settingsOutline}></IonIcon>
              </span>
              <span className="title">Settings</span>
            </Link>
          </li>
          <li>
            <Link className="menu-link" to={`/`}>
              <span className="icon">
                <IonIcon
                  className="ion-icon"
                  icon={lockClosedOutline}
                ></IonIcon>
              </span>
              <span className="title">Password</span>
            </Link>
          </li>
          <li>
            <Link className="menu-link" to={`/`}>
              <span className="icon">
                <IonIcon className="ion-icon" icon={logOutOutline}></IonIcon>
              </span>
              <span className="title">Sign out</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="main">
        <div className="topbar">
          <div className="toggle" onClick={toggleOnClick}>
            <IonIcon className="ion-icon" icon={menuOutline}></IonIcon>
          </div>
          <a href="#">
            <span className="icon">
              <img src="/imgs/logo-header.png" alt="" />
            </span>
          </a>
          <div className="search">
            <label htmlFor="">
              <input type="text" placeholder="Search Here" />
              <IonIcon className="ion-icon" icon={searchOutline}></IonIcon>
            </label>
          </div>
          {/* User IMG */}
          <div className="user">
            <img src="/imgs/user.jpg" alt="user" />
          </div>
        </div>
        <div className="content-page">
          <Outlet />
        </div>
        <div className="footer">
          <div className="title text-center">
            MOBIFONE - GIẢI PHÁP CHUYỂN ĐỔI SỐ
          </div>
          <div className="d-flex justify-content-center">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="rgba(5, 31, 77, 1)"
              >
                <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"></path>
              </svg>
            </div>
            <p className="address">
              Địa chỉ: Số 16 Trường Chinh, Phường Tân Lợi, TP Buôn Ma Thuột,
              Tỉnh Đắk Lắk
            </p>
          </div>
          {/* <div className="d-flex">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="rgba(5, 31, 77, 1)"
              >
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"></path>
              </svg>
            </div>

            <p className="hotline">Hotline: 0905018899</p>
          </div> */}
          {/* <div className="d-flex">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="rgba(5, 31, 77, 1)"
              >
                <path d="M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V8L12,13L20,8V18M20,6L12,11L4,6V6H20V6Z"></path>
              </svg>
            </div>
            <p className="email">Email: kdcntt7@mobifone.vn</p>
          </div> */}

          <div className="horizontal-line"></div>
          <div className="end-text">©2022 Allrights reserved</div>
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
